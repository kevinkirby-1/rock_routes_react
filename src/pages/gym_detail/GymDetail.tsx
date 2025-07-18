import "./GymDetail.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/layout/header/Header";
import { RouteList } from "../../components/route_list/RouteList";
import type { ClimbingGym } from "../../types/Gym";
import type { ClimbingRoute } from "../../types/Route";
import { useEffect, useState } from "react";
import { deleteGym, getGymById } from "../../services/gymServices";
import { getRoutes } from "../../services/routeServices";
import { IoMdTrash } from "react-icons/io";
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
  const [routesExist, setRoutesExist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        console.error(err);
      }
    };
    getSingleGym();
  }, []);

  useEffect(() => {
    const getGymRoutes = async () => {
      try {
        const routes = (await getRoutes()) as ClimbingRoute[];
        if (routes) {
          setRoutesExist(true);
        }
        const filteredRoutes = routes.filter((route) => {
          return route.gym === selectedGym?._id;
        });
        setGymRoutes(filteredRoutes);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getGymRoutes();
  }, [selectedGym]);

  const deleteSingleGym = async () => {
    try {
      if (
        confirm("Are you sure you want to delete " + selectedGym?.name + "?")
      ) {
        await deleteGym(id);
        navigate("/gyms");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="app_body">
      <Header
        headerText={selectedGym ? selectedGym.name : ""}
        showUser={true}
      ></Header>
      <Nav></Nav>
      <section className="content_body">
        {!isLoading ? (
          <div id="gym_details">
            <img src={selectedGym ? selectedGym.img : undefined} alt="" />
            <div id="detail_list">
              <p id="address">{selectedGym ? selectedGym.address : ""}</p>
              <hr />
              <p>{selectedGym ? selectedGym.description : ""}</p>
            </div>
            {routesExist ? (
              <div id="gym_route_list">
                <h1>Routes at {selectedGym?.name}</h1>
                <RouteList
                  climbingRoutes={gymRoutes ? gymRoutes : []}
                  gymListId="gymRouteList"
                  gymListCardId="gym_list_route_card"
                />
              </div>
            ) : (
              <>
              <hr />
              <p id="noRoutes">No routes at this gym yet</p>
              </>
            )}
            <Link to={`/newgym/${id}`} className="button edit">
              <MdEdit /> Edit Gym
            </Link>
            <button onClick={deleteSingleGym} className="delete">
              <IoMdTrash /> Delete Gym
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </section>
  );
}
