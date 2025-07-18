import "../../components/charts/charts.scss";
import { Header } from "../../components/layout/header/Header";
import GradeDistribution from "../../components/charts/gradeDistribution";
import { useState } from "react";
import { DifficultyOverTime } from "../../components/charts/difficultyOverTime";
import { Nav } from "../../components/layout/nav/Nav";

export function Data() {
  const [graphToDisplay, setGraphToDisplay] = useState("gradeDistribution");
  const [activeButton, setActiveButton] = useState<boolean>(false);

  return (
    <section className="app_body">
      <Header headerText="Data" showUser={true} />
      <Nav></Nav>
      <section className="content_body" id="data">
        <section id="graph_selection">
          <button
            onClick={() => {
              setGraphToDisplay("gradeDistribution");
              setActiveButton(!activeButton);
            }}
            id={activeButton ? "active" : ""}
          >
            Grade Distribution
          </button>
          <button
            onClick={() => {
              setGraphToDisplay("difficultyOverTime");
              setActiveButton(!activeButton);
            }}
            id={!activeButton ? "active" : ""}
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
