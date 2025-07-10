import "./AllRoutes.scss";
import { Header } from "../header/Header";
import { RouteList } from "../route_list/RouteList";
import { TEMP_CLIMBING_ROUTES } from "../../db/climbingRoutes";

export function AllRoutes() {
  return (
    <section className="app_body">
      <Header headerText="All Routes" />
      <section className="content_body">
        <RouteList climbingRoutes={TEMP_CLIMBING_ROUTES}></RouteList>
      </section>
    </section>
  );
}
