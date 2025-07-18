import { Link } from "react-router-dom";
import "./RouteCard.scss";
import { FaRegCheckCircle } from "react-icons/fa";
import { RiProgress4Line } from "react-icons/ri";
import type { ClimbingRoute } from "../../types/Route";

interface RouteCardProps {
  climbingRoute: ClimbingRoute;
  gymListCardId?: string;
}

export function RouteCard({ climbingRoute, gymListCardId }: RouteCardProps) {
  return (
    <Link
      id={gymListCardId ? gymListCardId : "route_card"}
      to={`/routes/${climbingRoute._id}`}
    >
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
          <br />
          {climbingRoute.attempts && climbingRoute.attempts + " attempts"}
        </p>
      </div>
      <img
        src={climbingRoute.img}
        alt={"Picture of route " + climbingRoute.name}
      />
    </Link>
  );
}
