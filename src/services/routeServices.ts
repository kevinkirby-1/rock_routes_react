import axios from "axios";
import api from "../api/axiosConfig";
import type { ClimbingRoute } from "../types/Route";
import type {
  DifficultyOverTimeData,
  GradeDistributionData,
  gradeSystem,
} from "../types/types";

export const createRoute = async (routeData: ClimbingRoute) => {
  try {
    // Add route to db
    const response = await api.post("/routes", routeData);
    return response.data;
  } catch (error) {
    // Adding route failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const getRoutes = async () => {
  try {
    // Get all routes for current user
    const response = await api.get("/routes");
    return response.data;
  } catch (error) {
    // Getting routes failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const getRouteById = async (id: string) => {
  try {
    // Get single route by id
    const response = await api.get(`/routes/${id}`);
    return response.data;
  } catch (error) {
    // Getting route failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const updateRoute = async (id: string, routeData: ClimbingRoute) => {
  try {
    // Update route
    const response = await api.put(`/routes/${id}`, routeData);
    return response.data;
  } catch (error) {
    // Updating route failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const deleteRoute = async (id: string) => {
  try {
    // Delete route
    const response = await api.delete(`/routes/${id}`);
    return response.data; // Often an empty object or success message
  } catch (error) {
    // Deleting the route failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const logAttempt = async (id: string) => {
  try {
    // Add attempt
    const response = await api.put(`/routes/${id}/log-attempt`);
    return response.data;
  } catch (error) {
    // Updating route failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const toggleProjectStatus = async (id: string) => {
  try {
    // Toggle project status
    const response = await api.put(`/routes/${id}/toggle-project`);
    return response.data;
  } catch (error) {
    // Updating route failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const markRouteComplete = async (id: string) => {
  try {
    // Mark route complete
    const response = await api.put(`/routes/${id}/mark-complete`);
    return response.data;
  } catch (error) {
    // Updating route failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};



export const getGradeDistributionData = async (gradeSystem: gradeSystem) => {
  try {
    // Get all routes
    const routes = (await getRoutes()) as ClimbingRoute[];
    // Filter by grade system
    const singleSystemRoutes = routes.filter(
      (route) => route.gradeSystem === gradeSystem
    );
    const gradeMap = new Map<string, GradeDistributionData>();
    singleSystemRoutes.forEach((route) => {
      let key = route.grade as string;
      if (gradeSystem === "YDS") {
        const lastChar = key.slice(-1);
        if (["a", "b", "c", "d"].includes(lastChar)) {
          key = route.grade.slice(0, -1);
        }
      }
      // else if (gradeSystem === "French") {
      //   if (route.grade.endsWith("+")) {
      //     key = route.grade.slice(0, -1);
      //   }
      // }
      if (!gradeMap.has(key)) {
        gradeMap.set(key, {
          grade: key,
          complete: 0,
          attempted: 0,
          difficulty: route.difficulty,
        });
      }
      const summary = gradeMap.get(key)!;
      if (route.mostRecentAttempt) {
        summary.attempted++;
      }
      if (route.isComplete) {
        summary.complete++;
      }
    });

    const finalGradeBarChartData = Array.from(gradeMap.values());
    finalGradeBarChartData.sort((a, b) => a.difficulty - b.difficulty);
    return finalGradeBarChartData;
  } catch (error) {
    // Getting routes failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const getDifficultyOverTimeData = async (gradeSystem: gradeSystem) => {
  try {
    // Get all routes
    const routes = (await getRoutes()) as ClimbingRoute[];
    // Filter by grade system
    const singleSystemRoutes = routes.filter(
      (route) => route.gradeSystem === gradeSystem && route.isComplete
    );
    const groupedData = new Map<
      string,
      {
        date: Date;
        totalDifficulty: number;
        count: number;
        maxDifficulty: number;
      }
    >();
    singleSystemRoutes.forEach((route) => {
      // const dateKey = new Date(
      //   route.dateComplete!.getFullYear(),
      //   route.dateComplete!.getMonth(),
      //   route.dateComplete!.getDate()
      // );
      // const dateKeyString = dateKey.toISOString().split("T")[0];
      const dateKeyString = new Date(route.dateComplete!)
        .toISOString()
        .split("T")[0];

      if (!groupedData.has(dateKeyString)) {
        groupedData.set(dateKeyString, {
          date: new Date(route.dateComplete!),
          totalDifficulty: 0,
          count: 0,
          maxDifficulty: -Infinity,
        });
      }

      const currentGroup = groupedData.get(dateKeyString)!;

      currentGroup.totalDifficulty += route.difficulty;
      currentGroup.count += 1;
      currentGroup.maxDifficulty = Math.max(
        currentGroup.maxDifficulty,
        route.difficulty
      );
    });

    const difficultyOverTimeData: DifficultyOverTimeData[] = [];
    groupedData.forEach((group) => {
      difficultyOverTimeData.push({
        date: group.date.toLocaleDateString("en-US"),
        averageDifficulty: group.totalDifficulty / group.count,
        hardestDifficulty: group.maxDifficulty,
      });
    });

    difficultyOverTimeData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return difficultyOverTimeData;
  } catch (error) {
    // Getting routes failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};
