import "./charts.scss";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getGradeDistributionData } from "../../services/routeServices";
import type { GradeDistributionData, gradeSystem } from "../../types/types";

export default function gradeDistribution() {
  const [barChartData, setBarChartData] = useState<GradeDistributionData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [gradeSystem, setGradeSystem] = useState<gradeSystem>("V");
  const [activeButton, setActiveButton] = useState<boolean>(false);

  useEffect(() => {
    const getBarChartData = async () => {
      try {
        const data = await getGradeDistributionData(gradeSystem);
        setBarChartData(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getBarChartData();
  }, [gradeSystem, activeButton]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div id="buttons">
        <button
          onClick={() => {
            setGradeSystem("V");
            setActiveButton(!activeButton);
          }}
          id={activeButton ? "active" : ""}
        >
          Boulders
        </button>
        <button
          onClick={() => {
            setGradeSystem("YDS");
            setActiveButton(!activeButton);
          }}
          id={!activeButton ? "active" : ""}
        >
          Rope Routes
        </button>
        {/* <button onClick={() => setGradeSystem("French")}>French System</button> */}
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          barCategoryGap="20%"
          barGap="0"
          data={barChartData}
          margin={{
            top: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="grade" minTickGap={0} />
          <YAxis width={20} domain={[0, "dataMax + 1"]} allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="attempted"
            name="Attempted"
            fill="#b3a696ff"
            activeBar={<Rectangle fill="#a79286ff" stroke="#dd6926ff" />}
          />
          <Bar
            dataKey="complete"
            name="Completed"
            fill="#527425ff"
            activeBar={<Rectangle fill="#6aa51dff" stroke="#90f808ff" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
