import "./GymList.scss";
import { Link } from "react-router-dom";
import { GymCard } from "../../components/gym_card/GymCard";
import { Header } from "../../components/layout/header/Header";
import { useEffect, useState } from "react";
import type { ClimbingGym } from "../../types/Gym";
import { getGyms } from "../../services/gymServices";
import { Nav } from "../../components/layout/nav/Nav";

export function GymList() {
  const [climbingGyms, setClimbingGyms] = useState<ClimbingGym[]>([]);

  useEffect(() => {
    const getAllGyms = async () => {
      try {
        // Get all gyms from db
        const gyms = await getGyms();
        setClimbingGyms(gyms as ClimbingGym[]);
      } catch (err) {
        console.error(err);
      }
    };
    getAllGyms();
  }, []);

  return (
    <section className="app_body">
      <Header headerText="Gyms" showUser={true}/>
      <Nav></Nav>
      <section id="route_list" className="content_body">
        <Link className="button" id="add-gym" to={"/newGym/new"}>
          Add New
        </Link>
        {climbingGyms.map((gym) => (
          <GymCard key={gym._id} climbingGym={gym} />
        ))}
      </section>
    </section>
  );
}
