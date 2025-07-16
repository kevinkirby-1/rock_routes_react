import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  difficultyToVGradeLookup,
  difficultyToYDSGradeLookup,
  dificultyToFrenchGradeLookup,
  type DifficultyOverTimeData,
  type gradeSystem,
} from "../../types/types";
import { getDifficultyOverTimeData } from "../../services/routeServices";

export function DifficultyOverTime() {
  const [lineChartData, setLineChartData] =
    useState<DifficultyOverTimeData[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [gradeSystem, setGradeSystem] = useState<gradeSystem>("V");

  const convertToGrade = (tickValue: number): string => {
    if (gradeSystem === "V") {
      return (
        difficultyToVGradeLookup.get(tickValue)
          ? difficultyToVGradeLookup.get(tickValue)
          : ""
      ) as string;
    } else if (gradeSystem === "YDS") {
      return (
        difficultyToYDSGradeLookup.get(tickValue)
          ? difficultyToYDSGradeLookup.get(tickValue)
          : ""
      ) as string;
    } else if (gradeSystem === "French") {
      return (
        dificultyToFrenchGradeLookup.get(tickValue)
          ? dificultyToFrenchGradeLookup.get(tickValue)
          : ""
      ) as string;
    } else {
      return "N/A";
    }
  };

  const toolTipFormat = (
    value: number | string,
    name: string
  ): [string | number, string] => {
    if (gradeSystem === "V") {
      return difficultyToVGradeLookup.get(value as number)
        ? [difficultyToVGradeLookup.get(value as number) as string, name]
        : ["", ""];
    } else if (gradeSystem === "YDS") {
      return difficultyToYDSGradeLookup.get(value as number)
        ? [difficultyToYDSGradeLookup.get(value as number) as string, name]
        : ["", ""];
    } else if (gradeSystem === "French") {
      return dificultyToFrenchGradeLookup.get(value as number)
        ? [dificultyToFrenchGradeLookup.get(value as number) as string, name]
        : ["", ""];
    } else {
      return ["N/A", "test"];
    }
  };

  const shortenDate = (tickItem: string | number): string => {
    return (tickItem as string).slice(0, -5);
  };

  useEffect(() => {
    const getBarChartData = async () => {
      try {
        const data = await getDifficultyOverTimeData(gradeSystem);
        setLineChartData(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getBarChartData();
  }, [gradeSystem]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <button onClick={() => setGradeSystem("V")}>Boulders</button>
      <button onClick={() => setGradeSystem("YDS")}>
        Rope Routes
      </button>
      {/* <button onClick={() => setGradeSystem("French")}>French System</button> */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={lineChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={shortenDate} />
          <YAxis
            tickFormatter={convertToGrade}
            allowDecimals={false}
            minTickGap={0}
            tickCount={30}
            domain={[0, "dataMax + 1"]}
            tickLine={false}
          />
          <Tooltip formatter={toolTipFormat} />
          <Legend />
          <Line
            type="monotone"
            dataKey="averageDifficulty"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="hardestDifficulty" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
