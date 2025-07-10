import "../route_list/RouteList.scss";
import { TEMP_CLIMBING_GYMS } from "../../db/climbingGyms";
import { GymCard } from "../gym_card/GymCard";
import { Header } from "../header/Header";

export function GymList() {
  const climbingGyms = TEMP_CLIMBING_GYMS;

  return (
    <section className="app_body">
      <Header headerText="Gyms" />
      <section id="route_list" className="content_body">
        {climbingGyms.map((gym) => (
          <GymCard key={gym.id} climbingGym={gym} />
        ))}
      </section>
    </section >
  );
}
