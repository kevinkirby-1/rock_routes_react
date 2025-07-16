import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { RouteDetails } from "./pages/route_detail/RouteDetail";
import { GymList } from "./pages/gym_list/GymList";
import { GymDetail } from "./pages/gym_detail/GymDetail";
import { Data } from "./pages/data/Data";
import { Projects } from "./pages/projects/Projects";
import { Profile } from "./pages/profile/Profile";
import { NewRoute } from "./pages/new_route/NewRoute";
import { AllRoutes } from "./pages/all_routes/AllRoutes";
import { Register } from "./components/auth/register/register";
import { Login } from "./components/auth/login/login";
import { NewGym } from "./pages/new_gym/NewGym";

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <>
      <PrimeReactProvider>
        <AuthProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Projects />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/routes" element={<AllRoutes />} />
              <Route path="/routes/:id" element={<RouteDetails />} />
              <Route path="/newroute/:id" element={<NewRoute />} />
              <Route path="/gyms" element={<GymList />} />
              <Route path="/gyms/:id" element={<GymDetail />} />
              <Route path="/newgym/:id" element={<NewGym />} />
              <Route path="/data" element={<Data />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<div>404 - Not Found</div>} />
          </Routes>
        </AuthProvider>
      </PrimeReactProvider>
    </>
  );
}

export default App;
