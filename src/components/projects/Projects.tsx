import "./Projects.scss";
import { TEMP_CLIMBING_ROUTES } from "../../db/climbingRoutes";
import { Header } from "../header/Header";
import { RouteList } from "../route_list/RouteList";

export function Projects() {
  const projectRoutes = TEMP_CLIMBING_ROUTES.filter(
    (climbingRoute) => climbingRoute.project
  );

  return (
    <section className="app_body">
      <Header headerText="Projects" />
      <section className="content_body">
        <RouteList climbingRoutes={projectRoutes} />
      </section>
    </section>
  );
}
