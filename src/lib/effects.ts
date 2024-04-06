import { IUser } from "@/db/models/User";
import { Dispatch, SetStateAction } from "react";
import { getDataFrom } from "./fetches";
import { ICourse } from "@/db/models/Course";

const baseUrl = process.env.HOST || "http://localhost:3000";

export function getCourses(setStateFunc: Dispatch<SetStateAction<ICourse[]>>) {
  async function fetchCourses() {
    const { courses } = await getDataFrom(`${baseUrl}/api/courses`);
    setStateFunc(courses as ICourse[]);
  }

  fetchCourses().catch(() => {
    window.location.replace("/login");
  });
}

export function getCurrentUser(
  setStateFunc: Dispatch<SetStateAction<IUser | null>>,
) {
  async function fetchUser() {
    const userData = await getDataFrom(`${baseUrl}/api/users/current`);
    setStateFunc(userData as IUser);
  }

  fetchUser().catch(() => {
    window.location.replace("/login");
  });
}

export function isAuthenticated(
  setStateFunc: Dispatch<SetStateAction<boolean>>,
) {
  async function fetchAuthenticated() {
    const { authenticated } = await getDataFrom(`${baseUrl}/api/auth`);
    setStateFunc(authenticated as boolean);
  }

  fetchAuthenticated().catch(() => {
    window.location.replace("/login");
  });
}
