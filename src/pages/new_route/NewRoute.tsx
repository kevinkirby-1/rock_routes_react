import "../NewForm.scss";
import { Header } from "../../components/layout/header/Header";
import {
  HOLD_COLOR_OPTIONS,
  ROUTE_GRADE_OPTIONS,
  ROUTE_HOLD_TYPE_OPTIONS,
  type routeAttributes,
  type grade,
  type holdColor,
  type holdType,
  type routeProtection,
} from "../../types/types";
import {
  calculateDifficultyScore,
  convertGradeToSystem,
  createSelect,
} from "../../utils/new_route_services";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../../services/authServices";
import {
  createRoute,
  getRouteById,
  updateRoute,
} from "../../services/routeServices";
import type { ClimbingRoute } from "../../types/Route";
import { useEffect, useState } from "react";
import { getGyms } from "../../services/gymServices";
import type { ClimbingGym } from "../../types/Gym";
import ImageUploadInput from "../../components/image_upload_input/ImageUploadInput";
import { Nav } from "../../components/layout/nav/Nav";

interface EditRouteParams {
  id: string;
  [key: string]: string | undefined;
}

export function NewRoute() {
  const [editRoute, setEditRoute] = useState<ClimbingRoute>();
  const [gymOptions, setGymOptions] = useState<ClimbingGym[]>();
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string | undefined>(editRoute?.img);

  const navigate = useNavigate();
  const { id } = useParams<EditRouteParams>();

  useEffect(() => {
    const getEditRoute = async () => {
      try {
        if (id === "new" || !id) {
          setEditRoute(undefined);
        } else {
          // Get route by id
          const route = await getRouteById(id);
          setEditRoute(route);
        }
        const gyms = await getGyms();
        setGymOptions(gyms);
        setisLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getEditRoute();
  }, []);

  const handleImageUploadSuccess = (imageUrl: string) => {
    setImageUrl(imageUrl);
  };

  const addOrEditRoute = async (formData: FormData) => {
    const name = formData.get("routeName") as string;
    const grade = formData.get("routeGrade") as grade;
    const difficulty = calculateDifficultyScore(grade);
    const gradeSystem = convertGradeToSystem(grade);
    let isProject = false;
    if (formData.get("routeIsProject")) {
      isProject = true;
    }
    let isComplete = editRoute?.isComplete || false;
    let dateComplete = editRoute?.dateComplete;
    if (formData.get("markIncomplete")) {
      isComplete = false;
      dateComplete = undefined;
    }
    const gym = formData.get("routeGym") as string;
    const protection = formData.get("routeProtection") as routeProtection;
    const setter = formData.get("routeSetter") as string;
    const dateSet = new Date(formData.get("routeDateSet") as string);
    const holdType = formData.get("routeHoldType") as holdType;
    const holdColor = formData.get("routeHoldColor") as holdColor;
    const attributes = formData.getAll("routeAttributes") as routeAttributes[];
    const notes = formData.get("routeNotes") as string;

    const currentUser = getCurrentUser();

    const newClimbingRoute: ClimbingRoute = {
      img: imageUrl || editRoute?.img || "/route_placeholder.png",
      name,
      grade,
      difficulty,
      gradeSystem,
      isProject,
      gym,
      protection,
      setter,
      dateSet,
      holdType,
      holdColor,
      attributes,
      notes,
      attempts: editRoute?.attempts || 0,
      mostRecentAttempt: editRoute?.mostRecentAttempt || undefined,
      isComplete,
      dateComplete,
      user: currentUser?._id ? currentUser._id : "",
    };

    try {
      let addedRoute: ClimbingRoute;
      if (editRoute) {
        addedRoute = await updateRoute(
          editRoute._id ? editRoute._id : "",
          newClimbingRoute
        );
      } else {
        addedRoute = await createRoute(newClimbingRoute);
      }

      navigate(`/routes/${addedRoute._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="app_body">
      <Header
        headerText={editRoute ? "Edit Route" : "Add Route"}
        showUser={true}
      ></Header>
      <Nav></Nav>
      <section className="content_body">
        {!isLoading ? (
          <form action={addOrEditRoute}>
            <label>
              Image
              <ImageUploadInput
                onImageUploadSuccess={handleImageUploadSuccess}
                initialImageUrl={editRoute?.img}
              ></ImageUploadInput>
            </label>

            <label>
              Route Name
              <input
                type="text"
                name="routeName"
                placeholder="Enter Route Name"
                defaultValue={editRoute?.name}
              />
            </label>

            <label>
              Grade
              <select name="routeGrade" defaultValue={editRoute?.grade}>
                <option>Select Grade</option>
                {createSelect(ROUTE_GRADE_OPTIONS)}
              </select>
            </label>

            <fieldset>
              <legend>Route Protection</legend>
              <label className="radioCheckbox">
                <input
                  type="radio"
                  name="routeProtection"
                  value="Boulder"
                  defaultChecked={
                    editRoute ? editRoute.protection === "Boulder" : false
                  }
                />
                Boulder
              </label>
              <label className="radioCheckbox">
                <input
                  type="radio"
                  name="routeProtection"
                  value="Top Rope"
                  defaultChecked={
                    editRoute ? editRoute.protection === "Top Rope" : false
                  }
                />
                Top Rope
              </label>
              <label className="radioCheckbox">
                <input
                  type="radio"
                  name="routeProtection"
                  value="Lead"
                  defaultChecked={
                    editRoute ? editRoute.protection === "Lead" : false
                  }
                />
                Lead
              </label>
            </fieldset>

            <label>
              Date Set
              <input
                type="date"
                name="routeDateSet"
                defaultValue={
                  editRoute?.dateSet
                    ? new Date(editRoute.dateSet).toISOString().split("T")[0]
                    : ""
                }
              />
            </label>

            <label>
              Gym
              <select
                name="routeGym"
                defaultValue={editRoute ? editRoute.gym : ""}
              >
                <option>Select Gym</option>
                {gymOptions?.map((gym) => (
                  <option value={gym._id} key={gym._id}>
                    {gym.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Setter
              <input
                type="text"
                name="routeSetter"
                placeholder="Enter Route Setter"
                defaultValue={editRoute ? editRoute.setter : ""}
              />
            </label>

            <hr />

            <label>
              Hold Type
              <select
                name="routeHoldType"
                defaultValue={editRoute ? editRoute.holdType : ""}
              >
                <option>Select Hold Type</option>
                {createSelect(ROUTE_HOLD_TYPE_OPTIONS)}
              </select>
            </label>

            <label>
              Hold Color
              <select
                name="routeHoldColor"
                defaultValue={editRoute ? editRoute.holdColor : ""}
              >
                <option>Select Hold Color</option>
                {createSelect(HOLD_COLOR_OPTIONS)}
              </select>
            </label>

            <fieldset>
              <legend>Route Attributes</legend>
              <label className="radioCheckbox">
                <input
                  type="checkbox"
                  name="routeAttributes"
                  value="Slab"
                  defaultChecked={
                    editRoute?.attributes
                      ? editRoute.attributes.includes("Slab")
                      : false
                  }
                />
                Slab
              </label>
              <label className="radioCheckbox">
                <input
                  type="checkbox"
                  name="routeAttributes"
                  value="Overhang"
                  defaultChecked={
                    editRoute?.attributes
                      ? editRoute.attributes.includes("Overhang")
                      : false
                  }
                />
                Overhang
              </label>
              <label className="radioCheckbox">
                <input
                  type="checkbox"
                  name="routeAttributes"
                  value="Crack"
                  defaultChecked={
                    editRoute?.attributes
                      ? editRoute.attributes.includes("Crack")
                      : false
                  }
                />
                Crack
              </label>
              <label className="radioCheckbox">
                <input
                  type="checkbox"
                  name="routeAttributes"
                  value="Traverse"
                  defaultChecked={
                    editRoute?.attributes
                      ? editRoute.attributes.includes("Traverse")
                      : false
                  }
                />
                Traverse
              </label>
              <label className="radioCheckbox">
                <input
                  type="checkbox"
                  name="routeAttributes"
                  value="Chimney"
                  defaultChecked={
                    editRoute?.attributes
                      ? editRoute.attributes.includes("Chimney")
                      : false
                  }
                />
                Chimney
              </label>
              <label className="radioCheckbox">
                <input
                  type="checkbox"
                  name="routeAttributes"
                  value="Corner"
                  defaultChecked={
                    editRoute?.attributes
                      ? editRoute.attributes.includes("Inside Corner")
                      : false
                  }
                />
                Corner
              </label>
              <label className="radioCheckbox">
                <input
                  type="checkbox"
                  name="routeAttributes"
                  value="Arete"
                  defaultChecked={
                    editRoute?.attributes
                      ? editRoute.attributes.includes("Arete")
                      : false
                  }
                />
                Arete
              </label>
            </fieldset>

            <fieldset>
              <label className="radioCheckbox">
                <input
                  type="checkbox"
                  name="routeIsProject"
                  defaultChecked={editRoute ? editRoute.isProject : true}
                />
                Mark this as a project
              </label>
            </fieldset>

            {editRoute && editRoute.isComplete && (
              <fieldset>
                <label className="radioCheckbox">
                  <input
                    type="checkbox"
                    name="markIncomplete"
                    defaultChecked={false}
                  />
                  Mark Incomplete
                </label>
              </fieldset>
            )}

            <label>
              Notes
              <textarea
                rows={5}
                name="routeNotes"
                placeholder="Notes about the route"
                defaultValue={editRoute ? editRoute.notes : ""}
              ></textarea>
            </label>
            <button type="submit">
              {editRoute ? "Edit Route" : "Add Route"}
            </button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </section>
  );
}
