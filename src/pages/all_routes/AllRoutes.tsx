import "./AllRoutes.scss";
import { Header } from "../../components/layout/header/Header";
import { RouteList } from "../../components/route_list/RouteList";
import { getRoutes } from "../../services/routeServices";
import { useEffect, useState } from "react";
import type { ClimbingRoute } from "../../types/Route";
import { Nav } from "../../components/layout/nav/Nav";

export function AllRoutes() {
  const [climbingRoutes, setClimbingRoutes] = useState<ClimbingRoute[]>([]);

  useEffect(() => {
    const getRoutesFromDb = async () => {
      try {
        // Get routes from db
        const jsonRoutes = await getRoutes();
        setClimbingRoutes(jsonRoutes);
      } catch (err) {
        // Getting routes failed
        console.error(err);
      }
    };

    getRoutesFromDb();
  }, []);

  return (
    <section className="app_body">
      <Nav></Nav>
      <Header headerText="All Routes" />
      <section className="content_body">
        <RouteList climbingRoutes={climbingRoutes}></RouteList>
      </section>
    </section>
  );
}
