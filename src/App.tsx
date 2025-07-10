import "./App.scss";
import { Nav } from "./components/nav/Nav";
import { Route, Routes } from "react-router-dom";
import { RouteDetails } from "./components/route_detail/RouteDetail";
import { GymList } from "./components/gym_list/GymList";
import { GymDetail } from "./components/gym_detail/GymDetail";
import { Data } from "./components/data/Data";
import { Projects } from "./components/projects/Projects";
import { Profile } from "./components/profile/Profile";
import { NewRoute } from "./components/new_route/NewRoute";
import { AllRoutes } from "./components/all_routes/AllRoutes";

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css";

function App() {
  return (
    <>
      <PrimeReactProvider>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/routes" element={<AllRoutes />} />
          <Route path="/routes/:id" element={<RouteDetails />} />
          <Route path="/gyms" element={<GymList />} />
          <Route path="/gyms/:id" element={<GymDetail />} />
          <Route path="/data" element={<Data />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/newroute/:id" element={<NewRoute />} />
        </Routes>
      </PrimeReactProvider>
    </>
  );
}

export default App;
