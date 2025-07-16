import "./Nav.scss";
import { NavLink } from "react-router-dom";
import { GrDirections } from "react-icons/gr";
import { GiAlliedStar } from "react-icons/gi";
import { RiBuilding3Line } from "react-icons/ri";
import { BsClipboardData } from "react-icons/bs";

export function Nav() {
  return (
    <nav>
      <img src="/rock_routes_logo.svg" alt="Rock Routes Logo" />
      <NavLink to="/projects">
        <span>
          <GiAlliedStar />
        </span>
        Projects
      </NavLink>
      <NavLink to="/gyms">
        <span>
          <RiBuilding3Line />
        </span>
        Gyms
      </NavLink>
      <NavLink to="/routes">
        <span>
          <GrDirections />
        </span>
        Routes
      </NavLink>
      <NavLink to="/data">
        <span>
          <BsClipboardData />
        </span>
        Data
      </NavLink>
    </nav>
  );
}
