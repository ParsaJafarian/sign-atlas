import { DetailedEnrollment, IUser } from "@/db/models/User";
import { Dispatch, SetStateAction } from "react";
import { getDataFrom } from "./fetches";

const baseUrl = process.env.HOST || "http://localhost:3000";

export function getCourses(setStateFunc: Dispatch<SetStateAction<DetailedEnrollment[]>>) {
    async function fetchCourses() {
        const coursesData = await getDataFrom(`${baseUrl}/api/courses`);
        setStateFunc(coursesData as DetailedEnrollment[]);
    }

    fetchCourses().catch(() => {
        window.location.replace("/login");
    });
}

export function getCurrentUser(setStateFunc: Dispatch<SetStateAction<IUser | null>>) {
    async function fetchUser() {
        const userData = await getDataFrom(`${baseUrl}/api/users/current`);
        setStateFunc(userData as IUser);
    }

    fetchUser().catch(() => {
        window.location.replace("/login");
    });
}

export function isAuthenticated(setStateFunc: Dispatch<SetStateAction<boolean>>) {
    async function fetchAuthenticated() {
        const { authenticated } = await getDataFrom(`${baseUrl}/api/auth`);
        setStateFunc(authenticated as boolean);
    }

    fetchAuthenticated().catch(() => {
        window.location.replace("/login");
    });
}