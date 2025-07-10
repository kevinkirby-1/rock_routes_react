import { Link } from "react-router-dom";
import "./RouteCard.scss";
import type { ClimbingRoute } from "../../types";
import { FaRegCheckCircle } from "react-icons/fa";
import { RiProgress4Line } from "react-icons/ri";

interface RouteCardProps {
  climbingRoute: ClimbingRoute;
}

export function RouteCard({ climbingRoute }: RouteCardProps) {
  return (
    <Link id="route_card" to={`/routes/${climbingRoute.id}`}>
      <span>
        {climbingRoute.complete ? <FaRegCheckCircle /> : <RiProgress4Line />}
      </span>
      <div>
        <p>
          <strong>{climbingRoute.name}</strong>
        </p>
        <p>
          {climbingRoute.grade}({climbingRoute.difficulty}){" - "}
          {climbingRoute.routeProtection}
          <br></br>
          DC: {climbingRoute.dateComplete ? climbingRoute.dateComplete.toLocaleDateString('en-US') : null}
          <br />
          MRA: {climbingRoute.mostRecentAttempt ? climbingRoute.mostRecentAttempt.toLocaleDateString("en-US") : null}
          <br></br>
          DS: {climbingRoute.dateSet.toLocaleDateString("en-US")}
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
