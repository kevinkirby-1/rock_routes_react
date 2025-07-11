import "./NewRoute.scss";
import { Header } from "../header/Header";
import {
  HOLD_COLOR_OPTIONS,
  ROUTE_GRADE_OPTIONS,
  ROUTE_HOLD_TYPE_OPTIONS,
} from "../../types";
import { TEMP_CLIMBING_GYMS } from "../../db/climbingGyms";
import { addRoute, createSelect } from "../../utils/new_route_services";
import { useParams } from "react-router-dom";
import { TEMP_CLIMBING_ROUTES } from "../../db/climbingRoutes";

interface EditRouteParams {
  id: string;
  [key: string]: string | undefined;
}

export function NewRoute() {
  const { id } = useParams<EditRouteParams>();
  if (!id) {
    return <h1>Invalid Route ID</h1>;
  }
  let editRoute = TEMP_CLIMBING_ROUTES.find(
    (route) => route.id === parseInt(id)
  );

  return (
    <section className="app_body">
      <Header headerText={editRoute ? "Edit Route" : "Add Route"}></Header>
      <section className="content_body">
        <form action={addRoute}>
          <label>
            Image
            <input
              type="file"
              name="routeImage"
              accept="image/*"
              capture="environment"
            />
          </label>

          <label>
            Route Name
            <input
              type="text"
              name="routeName"
              placeholder="Enter Route Name"
              defaultValue={editRoute ? editRoute.name : ""}
            />
          </label>

          <label>
            Grade
            <select
              name="routeGrade"
              defaultValue={editRoute ? editRoute.grade : ""}
            >
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
                  ? editRoute.dateSet.toISOString().split("T")[0]
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
              {TEMP_CLIMBING_GYMS.map((gym) => (
                <option value={gym.id} key={gym.id}>
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
                defaultChecked={editRoute ? editRoute.isProject : false}
              />
              Mark this as a project
            </label>
          </fieldset>

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
      </section>
    </section>
  );
}
