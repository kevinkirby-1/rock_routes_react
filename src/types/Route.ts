import type {
  grade,
  gradeSystem,
  holdColor,
  holdType,
  routeAttributes,
  routeProtection,
} from "./types";

export interface ClimbingRoute {
  _id?: string;
  name: string;
  img?: string;
  grade: grade;
  difficulty: number;
  gradeSystem: gradeSystem;
  isProject: boolean;
  gym: string;
  protection?: routeProtection;
  setter?: string;
  dateSet?: Date;
  holdType?: holdType;
  holdColor?: holdColor;
  attributes?: routeAttributes[];
  notes?: string;
  attempts: number;
  mostRecentAttempt?: Date;
  isComplete: boolean;
  dateComplete?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  user: string;
}
