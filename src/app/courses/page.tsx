"use client";

import CourseCard from "@/components/CourseCard";
import { ProgressCard } from "@/components/ProgressCard";
import { UserButton } from "@/components/UserButton";
import { ICourse } from "@/db/models/Course";
import { getCourses } from "@/lib/effects";
import {
  Container,
  Title,
  Box,
  Stack,
  Card,
  Paper,
  Button,
} from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  useEffect(() => getCourses(setCourses), []);

  return (
    <Container h="100vh" size="lg">
      <UserButton />
      <Box mt="lg" h="60%">
        <Title>My courses</Title>
        <Card radius="md" px="xl" mt="md" withBorder bg="blue">
          <Stack gap="xl" justify="center">
            {courses.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                description={course.description}
                lessons={course.lessons}
                courseEndpoint={course.courseEndpoint}
                testEndpoint={course.testEndpoint}
              />
            ))}
            <Paper h="130px" radius="md" shadow="xl" py={0}>
              <Link href={"/tests/colors"}>
                <Button
                  w={"100%"}
                  h={"100%"}
                  // p={50}
                  variant="gradient"
                  gradient={{ from: "pink", to: "orange", deg: 90 }}
                >
                  <Title>Extra ✨ Spell Common Colors</Title>
                </Button>
              </Link>
            </Paper>
          </Stack>
        </Card>
      </Box >
    </Container >
  );
}
