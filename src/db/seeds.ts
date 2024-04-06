/**
 * Seed the database with some data
 * Seed functions for courses and users
 */

import Course from "./models/Course";
import { faker } from "@faker-js/faker";
import User from "./models/User";

//Seed Courses
const courses = [
  {
    title: "From A to M",
    description: "Learn the American Sign Language alphabet from A to M!",
    lessons: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"],
    courseEndpoint: "a-m",
    testEndpoint: "a-m",
  },
  {
    title: "From N to Z",
    description: "Learn the American Sign Language alphabet from N to Z!",
    lessons: ["n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    courseEndpoint: "n-z",
    testEndpoint: "n-z",
  },
];

export const seedCourses = async () => {
  await Course.deleteMany();
  console.log("Courses removed");
  await Course.create(courses);
  console.log("Courses seeded successfully");
};

const name = () => faker.person.firstName(); //just the first name
const email = () => faker.internet.email();
const password = () => faker.internet.password();

/**
 * Remove all users and seed the database with n users
 * @param n number of users to seed
 */
export const seedUsers = async (n: number = 1) => {
  const users = Array.from({ length: n }, () => ({
    name: name(),
    email: email(),
    password: password(),
  }));

  await User.deleteMany();
  console.log("Users removed");
  await User.create(users);
  console.log("Users seeded successfully");
};

export default async function seed(n: number = 1) {
  await seedCourses();
  await seedUsers(n);
}
