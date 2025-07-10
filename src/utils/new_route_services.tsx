import {
  gradeToDifficultyLookup,
  type ClimbingRoute,
  type grade,
  type gradeSystem,
  type holdColor,
  type holdType,
  type routeAttributes,
  type routeProtection,
} from "../types";

export const createSelect = (list: string[]) => {
  const optionsList = list.map((listOption) => (
    <option value={listOption} key={listOption}>
      {listOption}
    </option>
  ));
  return optionsList;
};

const convertGradeToSystem = (routeGrade: string) => {
  if (routeGrade.includes("V")) {
    return "V";
  } else if (routeGrade.includes(".")) {
    return "YDS";
  } else {
    return "French";
  }
};

const calculateDifficultyScore = (routeGrade: string) => {
  const normalizedGrade = routeGrade.toLowerCase();
  const difficultyScore = gradeToDifficultyLookup.get(normalizedGrade);
  if (typeof difficultyScore === "number") {
    return difficultyScore;
  } else return 0;
};

export const addRoute = (formData: FormData) => {
  const formRouteName = formData.get("routeName");
  let newRouteName: string;
  if (typeof formRouteName === "string") {
    newRouteName = formRouteName;
  } else {
    newRouteName = "";
  }

  const formRouteGrade = formData.get("routeGrade");
  let newRouteGrade: grade;
  let newRouteGradeSystem: gradeSystem;
  let newRouteDifficultyScore: number;
  if (typeof formRouteGrade === "string") {
    newRouteGrade = formRouteGrade;
    newRouteGradeSystem = convertGradeToSystem(newRouteGrade);
    newRouteDifficultyScore = calculateDifficultyScore(newRouteGrade);
  } else {
    newRouteGrade = "";
    newRouteGradeSystem = "";
    newRouteDifficultyScore = 0;
  }

  const formRouteImage = formData.get("routeImage");
  let newRouteImage: File;
  if (formRouteImage instanceof File) {
    newRouteImage = formRouteImage;
  }

  const formRouteDateSet = formData.get("routeDateSet");
  let newRouteDateSet: Date;
  if (typeof formRouteDateSet === "string") {
    newRouteDateSet = new Date(formRouteDateSet);
  } else {
    newRouteDateSet = new Date();
  }

  const formRouteGym = formData.get("routeGym");
  let newRouteGym: number;
  if (typeof formRouteGym === "string") {
    newRouteGym = parseInt(formRouteGym);
  } else {
    newRouteGym = 0;
  }

  const formRouteSetter = formData.get("routeSetter");
  let newRouteSetter: string;
  if (typeof formRouteSetter === "string") {
    newRouteSetter = formRouteSetter;
  } else {
    newRouteSetter = "";
  }

  const formRouteHoldType = formData.get("routeHoldType");
  let newRouteHoldType: holdType;
  if (typeof formRouteHoldType === "string") {
    newRouteHoldType = formRouteHoldType;
  } else {
    newRouteHoldType = "";
  }

  const formRouteProtection = formData.get("routeProtection");
  let newRouteProtection: routeProtection;
  if (typeof formRouteProtection === "string") {
    newRouteProtection = formRouteProtection;
  } else {
    newRouteProtection = "";
  }

  const formRouteHoldColor = formData.get("routeHoldColor");
  let newRouteHoldColor: holdColor;
  if (typeof formRouteHoldColor === "string") {
    newRouteHoldColor = formRouteHoldColor;
  } else {
    newRouteHoldColor = "";
  }

  const newRouteAttributes: routeAttributes[] = formData.getAll(
    "routeAttributes"
  ) as routeAttributes[];

  const formRouteIsProject = formData.get("routeIsProject");
  let newRouteIsProject: boolean;
  if (formRouteIsProject) {
    newRouteIsProject = true;
  } else newRouteIsProject = false;

  const formRouteNotes = formData.get("routeNotes");
  let newRouteNotes: string;
  if (typeof formRouteNotes === "string") {
    newRouteNotes = formRouteNotes;
  } else {
    newRouteNotes = "";
  }

  const newClimbingRoute: ClimbingRoute = {
    id: 51,
    name: newRouteName,
    grade: newRouteGrade,
    gradeSystem: newRouteGradeSystem,
    difficulty: newRouteDifficultyScore,
    routeProtection: newRouteProtection,
    holdType: newRouteHoldType,
    holdColor: newRouteHoldColor,
    project: newRouteIsProject,
    attempts: 0,
    mostRecentAttempt: undefined,
    complete: false,
    dateComplete: undefined,
    setter: newRouteSetter,
    dateSet: newRouteDateSet,
    routeAttributes: newRouteAttributes,
    gym: newRouteGym,
    notes: newRouteNotes,
  };

  console.log(newClimbingRoute);
};
