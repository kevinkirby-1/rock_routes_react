import "./GymDetail.scss";
import { useParams } from "react-router-dom";
import { TEMP_CLIMBING_GYMS } from "../../db/climbingGyms";
import type { ClimbingGym, ClimbingRoute } from "../../types";
import { Header } from "../header/Header";
import { RouteList } from "../route_list/RouteList";
import { TEMP_CLIMBING_ROUTES } from "../../db/climbingRoutes";

interface GymParams {
  id: string;
  [key: string]: string | undefined;
}

export function GymDetail() {
  const { id } = useParams<GymParams>();
  if (!id) {
    return <h1>Invalid Gym ID</h1>;
  }

  const gymId = parseInt(id, 10);
  const selectedGym: ClimbingGym | undefined = TEMP_CLIMBING_GYMS.find(
    (Gym) => Gym.id === gymId
  );
  if (!selectedGym) {
    return <h1>Gym Not Found</h1>;
  }

  const gymRoutes: ClimbingRoute[] = TEMP_CLIMBING_ROUTES.filter(
    (route) => route.gym === gymId
  );

  return (
    <section className="app_body">
      <Header headerText={selectedGym.name}></Header>
      <section className="content_body">
        <div id="gym_details">
          <p>{selectedGym.address}</p>
          <img src={selectedGym.img} alt="" />
          <p>{selectedGym.description}</p>
        </div>
        <RouteList climbingRoutes={gymRoutes} />
      </section>
    </section>
  );
}
