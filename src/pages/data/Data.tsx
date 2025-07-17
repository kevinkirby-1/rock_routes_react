import "./Data.scss";
import { Header } from "../../components/layout/header/Header";
import GradeDistribution from "../../components/charts/gradeDistribution";
import { useState } from "react";
import { DifficultyOverTime } from "../../components/charts/difficultyOverTime";
import { Nav } from "../../components/layout/nav/Nav";

export function Data() {
  const [graphToDisplay, setGraphToDisplay] = useState("gradeDistribution");

  return (
    <section className="app_body">
      <Header headerText="Data" showUser={true}/>
      <Nav></Nav>
      <section className="content_body" style={{ maxWidth: "85%" }}>
        <section id="graph_selection">
          <button
            onClick={() => {
              setGraphToDisplay("gradeDistribution");
            }}
          >
            Grade Distribution
          </button>
          <button
            onClick={() => {
              setGraphToDisplay("difficultyOverTime");
            }}
          >
            Difficulty Over Time
          </button>
        </section>
        {graphToDisplay === "gradeDistribution" && (
          <GradeDistribution></GradeDistribution>
        )}
        {graphToDisplay === "difficultyOverTime" && (
          <DifficultyOverTime></DifficultyOverTime>
        )}
      </section>
    </section>
  );
}
