import "./Projects.scss";
import { Header } from "../../components/layout/header/Header";
import { RouteList } from "../../components/route_list/RouteList";
import { useEffect, useState } from "react";
import type { ClimbingRoute } from "../../types/Route";
import { getRoutes } from "../../services/routeServices";
import { Nav } from "../../components/layout/nav/Nav";

export function Projects() {
  const [projectRoutes, setProjectRoutes] = useState<ClimbingRoute[]>();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const routes = (await getRoutes()) as ClimbingRoute[];
        const filteredRoutes = routes.filter(
          (route) => route.isProject === true
        );
        setProjectRoutes(filteredRoutes);
      } catch (err) {
        console.log(err);
      }
    };
    getProjects();
  });

  return (
    <section className="app_body">
      <Header headerText="Projects" />
      <Nav></Nav>
      <section className="content_body">
        <RouteList climbingRoutes={projectRoutes ? projectRoutes : []} />
      </section>
    </section>
  );
}
