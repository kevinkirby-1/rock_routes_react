import "./RouteDetail.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/layout/header/Header";
import { MdEdit } from "react-icons/md";
import { GiAlliedStar } from "react-icons/gi";
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
      <Header headerText={selectedRoute ? selectedRoute.name : ""} />
      <Nav></Nav>
      <section id="route_details" className="content_body">
        <Link to={`/newroute/${id}`}>
          <MdEdit />
        </Link>
        <img src={selectedRoute?.img} alt="" />
        <div id="details_list">
          {selectedRoute?.isProject ? (
            <p>
              <GiAlliedStar />
              Current Project
            </p>
          ) : (
            ""
          )}
          {selectedRoute?.isComplete ? (
            <p>
              <FaRegCheckCircle />
              Complete
            </p>
          ) : (
            ""
          )}
          <p>
            <strong>Attempts: </strong>
            {selectedRoute?.attempts}
            <button onClick={addAttempt}>+</button>
          </p>
          <p>
            <strong>Grade: </strong>
            {selectedRoute?.grade}
          </p>
          <p>
            <strong>Protection: </strong>
            {selectedRoute?.protection}
          </p>
          <p>
            <strong>Setter: </strong>
            {selectedRoute?.setter}
          </p>
          <p>
            <strong>Date Set: </strong>
            {selectedRoute?.dateSet
              ? new Date(selectedRoute.dateSet).toLocaleDateString("en-US")
              : ""}
          </p>
          <p>
            <strong>Date Complete: </strong>
            {selectedRoute?.dateComplete
              ? new Date(selectedRoute.dateComplete).toLocaleDateString("en-US")
              : "N/A"}
          </p>
          <p>
            <strong>Hold Color: </strong>
            {selectedRoute?.holdColor}
          </p>
          <p>
            <strong>Hold Style: </strong>
            {selectedRoute?.holdType}
          </p>
          <p>
            <strong>Gym: </strong>
            {selectedRouteGym?.name}
          </p>
          <p>
            <strong>Notes: </strong>
            {selectedRoute?.notes}
          </p>
          {!selectedRoute?.isComplete && (
            <button onClick={markComplete}>Mark Complete</button>
          )}
          {!selectedRoute?.isComplete && (
            <button onClick={toggleProject}>
              {selectedRoute?.isProject
                ? "Remove From Projects"
                : "Mark as Project"}
            </button>
          )}
          <button onClick={deleteSingleRoute}>Delete Route</button>
        </div>
      </section>
    </section>
  );
}
