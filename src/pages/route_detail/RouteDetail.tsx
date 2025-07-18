import "../RouteDetail.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/layout/header/Header";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import type { ClimbingRoute } from "../../types/Route";
import type { ClimbingGym } from "../../types/Gym";
import { useEffect, useState } from "react";
import {
  deleteRoute,
  getRouteById,
  logAttempt,
  markRouteComplete,
  toggleProjectStatus,
} from "../../services/routeServices";
import { getGymById } from "../../services/gymServices";
import { Nav } from "../../components/layout/nav/Nav";

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}

export function RouteDetails() {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<
    ClimbingRoute | undefined
  >();
  const [selectedRouteGym, setSelectedRouteGym] = useState<ClimbingGym>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = useParams<RouteParams>();

  if (!id) {
    return "Invalid Id";
  }

  useEffect(() => {
    const getSingleRoute = async () => {
      try {
        const route = await getRouteById(id);
        setSelectedRoute(route);
        const routeGym = await getGymById(route.gym);
        setSelectedRouteGym(routeGym);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getSingleRoute();
  }, []);

  const deleteSingleRoute = async () => {
    try {
      if (
        confirm("Are you sure you want to delete " + selectedRoute?.name + "?")
      ) {
        await deleteRoute(id);
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markComplete = async () => {
    try {
      const route = await markRouteComplete(id);
      setSelectedRoute(route);
    } catch (err) {
      console.error(err);
    }
  };

  const addAttempt = async () => {
    try {
      const route = await logAttempt(id);
      setSelectedRoute(route);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleProject = async () => {
    try {
      const route = await toggleProjectStatus(id);
      setSelectedRoute(route);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="app_body">
      <Header
        headerText={selectedRoute ? selectedRoute.name : ""}
        showUser={true}
      />
      <Nav></Nav>
      <section id="route_details" className="content_body">
        {!isLoading ? (
          <>
            <img
              src={selectedRoute?.img}
              alt="image of the rock climbing route"
            />
            <section id="details_list">
              {!selectedRoute?.isComplete && (
                <div>
                  <button onClick={toggleProject} id="project_button">
                    {selectedRoute?.isProject
                      ? "Remove From Projects"
                      : "Mark as Project"}
                  </button>

                  {!selectedRoute?.isComplete && selectedRoute?.attempts && (
                    <button onClick={markComplete}>Mark Complete</button>
                  )}
                </div>
              )}
              {selectedRoute?.dateComplete && selectedRoute.isComplete && (
                <div>
                  <strong>
                    <FaRegCheckCircle /> Date Completed
                  </strong>
                  <span>
                    {new Date(selectedRoute.dateComplete).toLocaleDateString(
                      "en-US"
                    )}
                  </span>
                </div>
              )}
              <div id="attempts">
                <strong>Attempts: </strong>
                {!selectedRoute?.isComplete && (
                  <button onClick={addAttempt}>+</button>
                )}
                <span>{selectedRoute?.attempts}</span>
              </div>
              {selectedRoute?.mostRecentAttempt &&
                !selectedRoute.isComplete && (
                  <div>
                    <strong>Most Recent Attempt</strong>
                    <span>
                      {new Date(
                        selectedRoute.mostRecentAttempt
                      ).toLocaleDateString("en-US")}
                    </span>
                  </div>
                )}
              <div>
                <strong>Grade: </strong>
                <span>{selectedRoute?.grade}</span>
              </div>

              {selectedRoute?.protection && (
                <div>
                  <strong>Protection: </strong>{" "}
                  <span>{selectedRoute?.protection}</span>
                </div>
              )}
              {selectedRoute?.holdColor && (
                <div>
                  <strong>Hold Color: </strong>
                  <span>{selectedRoute?.holdColor}</span>
                </div>
              )}
              {selectedRoute?.holdType && (
                <div>
                  <strong>Hold Type: </strong>
                  <span>{selectedRoute?.holdType}</span>
                </div>
              )}
              {selectedRoute?.attributes && (
                <div id="attributes">
                  <strong>Attributes</strong>
                  <span>
                    <ul>
                      {selectedRoute.attributes.map((attribute) => (
                        <li>{attribute}</li>
                      ))}
                    </ul>
                  </span>
                </div>
              )}
              {selectedRouteGym?.name && (
                <div>
                  <strong>Gym: </strong>
                  <span>{selectedRouteGym?.name}</span>
                </div>
              )}
              {selectedRoute?.setter && (
                <div>
                  <strong>Setter: </strong>
                  <span>{selectedRoute?.setter}</span>
                </div>
              )}
              {selectedRoute?.dateSet && (
                <div>
                  <strong>Date Set: </strong>
                  <span>
                    {new Date(selectedRoute.dateSet).toLocaleDateString(
                      "en-US"
                    )}
                  </span>
                </div>
              )}
              {selectedRoute?.notes && (
                <div id="notes">
                  <strong>Notes: </strong>
                  {selectedRoute?.notes}
                </div>
              )}
            </section>
            <Link to={`/newroute/${id}`} className="button edit">
              <MdEdit /> Edit Route
            </Link>
            <button onClick={deleteSingleRoute} className="delete">
              <IoMdTrash /> Delete Route
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </section>
  );
}
