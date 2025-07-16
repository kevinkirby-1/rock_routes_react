import { Link } from "react-router-dom";
import "./RouteCard.scss";
import { FaRegCheckCircle } from "react-icons/fa";
import { RiProgress4Line } from "react-icons/ri";
import type { ClimbingRoute } from "../../types/Route";

interface RouteCardProps {
  climbingRoute: ClimbingRoute;
}

export function RouteCard({ climbingRoute }: RouteCardProps) {
  return (
    <Link id="route_card" to={`/routes/${climbingRoute._id}`}>
      <span>
        {climbingRoute.isComplete ? <FaRegCheckCircle /> : <RiProgress4Line />}
      </span>
      <div>
        <p>
          <strong>{climbingRoute.name}</strong>
        </p>
        <p>
          {climbingRoute.grade}
          {" - "}
          {climbingRoute.protection}
          <br></br>
          DC:{" "}
          {climbingRoute.dateComplete
            ? new Date(climbingRoute.dateComplete).toLocaleDateString("en-US")
            : null}
          <br />
          MRA:{" "}
          {climbingRoute.mostRecentAttempt
            ? new Date(climbingRoute.mostRecentAttempt).toLocaleDateString(
                "en-US"
              )
            : null}
          <br></br>
          DS:{" "}
          {climbingRoute.dateSet
            ? new Date(climbingRoute.dateSet).toLocaleDateString("en-US")
            : null}
          <br />
          {climbingRoute.holdType}
        </p>
      </div>
      <img
        src={climbingRoute.img}
        alt={"Picture of route " + climbingRoute.name}
      />
    </Link>
  );
}
