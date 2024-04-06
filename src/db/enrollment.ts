/**
 * @fileoverview Enrollment model and schema for the enrollment collection
 * An enrollment is a user's progress in a course that the user is taking.
 * It's not a model on its own, but a subdocument of the User model.
 */

import Course, { ICourse } from "@/db/models/Course";
import { IUser } from "./models/User";

/**
 * Interface for the enrollment document
 */
export interface Enrollment {
  course: ICourse["_id"]; //points to the course the user is enrolled in
  completedLessons: string[];
}

async function getLessonsValidations(enrollment: Enrollment) {
  const course = await Course.findById(enrollment.course);
  const lessonsIncludeCompleted = enrollment.completedLessons.every((lesson) =>
    course.lessons.includes(lesson),
  );
  const lengthMatches =
    enrollment.completedLessons.length <= course.lessons.length;
  const uniqueLessons =
    new Set(enrollment.completedLessons).size ===
    enrollment.completedLessons.length;
  return {
    lessonsIncludeCompleted,
    lengthMatches,
    uniqueLessons,
  };
};

export async function validateCompletedLessons(user: IUser) {
  Promise.all(
    user.enrollments.map(async (enrollment) => {
      const { lessonsIncludeCompleted, lengthMatches, uniqueLessons } =
        await getLessonsValidations(enrollment);
      if (!lessonsIncludeCompleted)
        user.invalidate(
          "completedLessons",
          "Completed lessons must be part of the course lessons",
        );
      if (!lengthMatches)
        user.invalidate(
          "completedLessons",
          "Completed lessons must not exceed the course lessons",
        );
      if (!uniqueLessons)
        user.invalidate("completedLessons", "Completed lessons must be unique");
    }),
  );
};

export function validateEnrollmentsUniqueness(user: IUser) {
  //Validate that all courses are unique because a user can't be enrolled in the same course twice
  const courseIds = user.enrollments.map((enrollment) => enrollment.course);
  const uniqueCourses = new Set(courseIds).size === courseIds.length;
  if (!uniqueCourses)
    user.invalidate("enrollments", "Enrolled courses must be unique");
};
