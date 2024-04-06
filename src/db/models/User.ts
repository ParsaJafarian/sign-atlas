/**
 * Mongoose model User for user collection
 */
import {
  Enrollment,
  validateCompletedLessons,
  validateEnrollmentsUniqueness,
} from "@/db/enrollment";
import connectDB from "@/db/connectDB";
import mongoose from "mongoose";
import Course from "./Course";

//connect to the database
connectDB();

export interface DetailedEnrollment {
  _id: string;
  title: string;
  description: string;
  lessons: string[];
  completedLessons: string[];
  __v: number;
  courseEndpoint: string;
  testEndpoint: string;
}

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  enrollments: Enrollment[];
  getEnrollmentByCourseId(courseId: string): Enrollment;
  completeLessons(courseId: string, lesson: string[]): Promise<void>;
  getProgress(courseId: string): Promise<number>;
  addEnrollment(courseId: string): Promise<void>;
  isEnrolledIn(courseId: string): boolean;
  getDetailedEnrollments(): Promise<DetailedEnrollment[]>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  enrollments: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      completedLessons: {
        type: [String],
        default: [],
      },
    },
  ],
});

/**
 * Pre save hook to add all courses to the user's enrollments when a new user is created
 */
userSchema.pre("save", async function () {
  if (this.isNew) {
    const courses = await Course.find();
    if (!courses) return;
    //Add all courses to the user's enrollments
    this.enrollments = courses.map((course) => ({
      course: course._id,
      completedLessons: [],
    }));
  }
});

// Validate that all enrollments are valid and that they are unique
userSchema.pre("validate", async function () {
  validateCompletedLessons(this);
  validateEnrollmentsUniqueness(this);
});

/**
 * Get the enrollment of the user by the courseId. If the enrollment is not found, throw an error
 * @param this reference to the user document
 * @param courseId CourseId of the course in string format
 * @returns enrollment that points to the course with the given courseId
 */
userSchema.methods.getEnrollmentByCourseId = function (
  this: IUser,
  courseId: string,
) {
  const enrollment = this.enrollments.find(
    (enrollment) => enrollment.course.toString() === courseId,
  );
  if (!enrollment)
    throw new Error("Course not found in enrollments of current user");
  return enrollment;
};

/**
 * return enrollments object that includes the course object spreaded and completedLessons array
 * @param this reference to the user document
 * @returns a more detailed version of the enrollments array with the course object and completedLessons array
 */
userSchema.methods.getDetailedEnrollments = async function (this: IUser) {
  const enrollments = Promise.all(
    this.enrollments.map(async (enrollment) => {
      const course = await Course.findById(enrollment.course);
      return {
        ...course.toObject(),
        completedLessons: enrollment.completedLessons,
      };
    }),
  );
  return enrollments;
};

/**
 *
 * @param this reference to the user document
 * @param courseId courseId of the course in string format. If courseId is not provided, return true if the user is enrolled in any course
 * @returns boolean indicating if the user is enrolled in the course with the given courseId
 */
userSchema.methods.isEnrolledIn = function (this: IUser, courseId: string) {
  return this.enrollments.some(
    (enrollment) => enrollment.course.toString() === courseId,
  );
};

/**
 *
 * @param this reference to the user document
 * @param courseId CourseId of the course in string format
 */
userSchema.methods.addEnrollment = async function (
  this: IUser,
  courseId: string,
) {
  const course = await Course.findById(courseId);
  if (!course) throw new Error("Course not found");
  if (this.isEnrolledIn(courseId))
    throw new Error("User is already enrolled in the course");

  const enrollment = {
    course: course._id,
    completedLessons: [],
  };
  this.enrollments.push(enrollment);
};

userSchema.methods.completeLessons = function (
  this: IUser,
  courseId: string,
  lessons: string[],
) {
  const enrollment = this.getEnrollmentByCourseId(courseId);
  enrollment.completedLessons = lessons;
};

userSchema.methods.getDetailedEnrollments = async function (this: IUser) {
  const enrollments = Promise.all(
    this.enrollments.map(async (enrollment) => {
      const course = await Course.findById(enrollment.course);
      return {
        ...course.toObject(),
        completedLessons: enrollment.completedLessons,
      };
    }),
  );
  return enrollments;
};

const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
