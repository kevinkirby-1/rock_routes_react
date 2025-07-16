import { gradeToDifficultyLookup } from "../types/types";

export const createSelect = (list: readonly any[]) => {
  const optionsList = list.map((listOption) => (
    <option value={listOption} key={listOption}>
      {listOption}
    </option>
  ));
  return optionsList;
};

export const convertGradeToSystem = (routeGrade: string) => {
  if (routeGrade.includes("V")) {
    return "V";
  } else {
    return "YDS";
  }
};

export const calculateDifficultyScore = (routeGrade: string) => {
  const normalizedGrade = routeGrade.toLowerCase();
  const difficultyScore = gradeToDifficultyLookup.get(normalizedGrade);
  if (typeof difficultyScore === "number") {
    return difficultyScore;
  } else return 0;
};
