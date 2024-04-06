"use client";

import CourseCard from "@/components/CourseCard";
import { ProgressCard } from "@/components/ProgressCard";
import { UserButton } from "@/components/UserButton";
import { DetailedEnrollment } from "@/db/models/User";
import { getCourses } from "@/lib/effects";
import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Box,
  Stack,
  Card,
  Group,
  Paper,
  Center,
  Button,
} from "@mantine/core";
import Link from "next/link";

export default function Courses() {
  const [courses, setCourses] = useState<DetailedEnrollment[]>([]);
  useEffect(() => getCourses(setCourses), []);

  return (
    <Container h="100vh" size="lg">
      <UserButton />
      <Box mt="lg" h="60%">
        <Title>My courses</Title>
        <ProgressCard mt="md" />
        <Card radius="md" px="xl" mt="md" withBorder bg="blue">
          <Stack gap="xl" justify="center">
            {courses.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                description={course.description}
                lessons={course.lessons}
                completedLessons={course.completedLessons}
                courseEndpoint={course.courseEndpoint}
                testEndpoint={course.testEndpoint}
              />
            ))}
          </Stack>
        </Card>
      </Box >
    </Container >
  );
}
