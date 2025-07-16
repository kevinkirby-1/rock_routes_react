import { Link } from "react-router-dom";
import "../route_card/RouteCard.scss";
import { RiBuilding3Line } from "react-icons/ri";
import { GiMountaintop } from "react-icons/gi";
import type { ClimbingGym } from "../../types/Gym";

interface GymCardProps {
  climbingGym: ClimbingGym;
}

export function GymCard({ climbingGym }: GymCardProps) {
  return (
    <Link id="route_card" to={`/gyms/${climbingGym._id}`}>
      <span>
        {climbingGym.isIndoor ? <RiBuilding3Line /> : <GiMountaintop />}
      </span>
      <div>
        <p>
          <strong>{climbingGym.name}</strong>
        </p>
        <p>{climbingGym.address}</p>
      </div>
      <img src={climbingGym.img} alt="" />
    </Link>
  );
}
