import "./GymDetail.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/layout/header/Header";
import { RouteList } from "../../components/route_list/RouteList";
import type { ClimbingGym } from "../../types/Gym";
import type { ClimbingRoute } from "../../types/Route";
import { useEffect, useState } from "react";
import { deleteGym, getGymById } from "../../services/gymServices";
import { getRoutes } from "../../services/routeServices";
import { MdEdit } from "react-icons/md";
import { Nav } from "../../components/layout/nav/Nav";

interface GymParams {
  id: string;
  [key: string]: string | undefined;
}

export function GymDetail() {
  const navigate = useNavigate();
  const [selectedGym, setSelectedGym] = useState<ClimbingGym | undefined>();
  const [gymRoutes, setGymRoutes] = useState<ClimbingRoute[] | undefined>();

  const { id } = useParams<GymParams>();
  if (!id) {
    return <h1>Invalid Gym ID</h1>;
  }

  useEffect(() => {
    const getSingleGym = async () => {
      try {
        const gym = await getGymById(id);
        setSelectedGym(gym);
      } catch (err) {
        console.log(err);
      }
    };
    getSingleGym();
  }, []);

  useEffect(() => {
    const getGymRoutes = async () => {
      try {
        const routes = (await getRoutes()) as ClimbingRoute[];
        const filteredRoutes = routes.filter((route) => {
          return route.gym === selectedGym?._id;
        });
        setGymRoutes(filteredRoutes);
      } catch (err) {
        console.log(err);
      }
    };
    getGymRoutes();
  }, [selectedGym]);

  const deleteSingleGym = async () => {
    try {
      if (
        confirm("Are you sure you want to delete " + selectedGym?.name + "?")
      ) {
        const message = await deleteGym(id);
        console.log(message);
        navigate("/gyms");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="app_body">
      <Header headerText={selectedGym ? selectedGym.name : ""}></Header>
      <Nav></Nav>
      <section className="content_body">
        <div id="gym_details">
          <Link to={`/newgym/${id}`} id="editButton">
            <MdEdit />
          </Link>
          <div id="deatail_list">
            <img src={selectedGym ? selectedGym.img : undefined} alt="" />
            <p>{selectedGym ? selectedGym.address : ""}</p>
            <p>{selectedGym ? selectedGym.description : ""}</p>
          </div>
          <div id="route_list">
            <h1>Routes at {selectedGym?.name}</h1>
            <RouteList climbingRoutes={gymRoutes ? gymRoutes : []} />
          </div>
          <button onClick={deleteSingleGym}>Delete Gym</button>
        </div>
      </section>
    </section>
  );
}
