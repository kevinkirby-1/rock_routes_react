import { Link, useParams } from "react-router-dom";
import "./RouteDetail.scss";
import { TEMP_CLIMBING_ROUTES } from "../../db/climbingRoutes";
import type { ClimbingGym, ClimbingRoute } from "../../types";
import { Header } from "../header/Header";
import { MdEdit } from "react-icons/md";
import { GiAlliedStar } from "react-icons/gi";
import { FaRegCheckCircle } from "react-icons/fa";
import { TEMP_CLIMBING_GYMS } from "../../db/climbingGyms";

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}

export function RouteDetails() {
  const { id } = useParams<RouteParams>();

  if (!id) {
    return <h1>Invalid Route ID</h1>;
  }
  const routeId = parseInt(id);

  const selectedRoute: ClimbingRoute | undefined = TEMP_CLIMBING_ROUTES.find(
    (route) => route.id === routeId
  );

  if (!selectedRoute) {
    return <h1>Route Not Found</h1>;
  }

  const selectedGym: ClimbingGym | undefined = TEMP_CLIMBING_GYMS.find(
    (gym) => gym.id === selectedRoute.gym
  );

  return (
    <section className="app_body">
      <Header headerText={selectedRoute.name} />
      <section id="route_details" className="content_body">
        <Link to={`/newroute/${id}`}>
          <MdEdit />
        </Link>
        <img src={selectedRoute.img} alt="" />
        <div id="details_list">
          {selectedRoute.project ? (
            <p>
              <GiAlliedStar />
              Current Project
            </p>
          ) : (
            ""
          )}
          {selectedRoute.complete ? (
            <p>
              <FaRegCheckCircle />
              Complete
            </p>
          ) : (
            ""
          )}
          <p>
            <strong>Attempts: </strong>
            {selectedRoute.attempts}
          </p>
          <p>
            <strong>Grade: </strong>
            {selectedRoute.grade}
          </p>
          <p>
            <strong>Protection: </strong>
            {selectedRoute.routeProtection}
          </p>
          <p>
            <strong>Setter: </strong>
            {selectedRoute.setter}
          </p>
          <p>
            <strong>Date Set: </strong>
            {selectedRoute.dateSet.toLocaleDateString('en-US')}
          </p>
          <p>
            <strong>Date Complete: </strong>
            {selectedRoute.dateComplete ? selectedRoute.dateComplete.toLocaleDateString('en-US') : "N/A"}
          </p>
          <p>
            <strong>Hold Color: </strong>
            {selectedRoute.holdColor}
          </p>
          <p>
            <strong>Hold Style: </strong>
            {selectedRoute.holdType}
          </p>
          <p>
            <strong>Gym: </strong>
            {selectedGym ? selectedGym.name : "N/A"}
          </p>
          <p>
            <strong>Notes: </strong>
            {selectedRoute.notes}
          </p>
        </div>
      </section>
    </section>
  );
}
