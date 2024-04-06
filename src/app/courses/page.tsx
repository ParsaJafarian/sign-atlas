import CourseCard from "@/components/CourseCard";
import { ProgressCard } from "@/components/ProgressCard";
import { UserButton } from "@/components/UserButton";
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
  interface CourseCardProps {
    title: string;
    description: string;
    lessons: string[];
    completedLessons: string[];
    courseEndpoint: string;
    testEndpoint: string;
  }

  const mockData: CourseCardProps[] = [
    {
      title: "From A to M",
      description: "Learn the American Sign Language from A to J!",
      lessons: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
      ],
      completedLessons: ["a", "b"],
      courseEndpoint: "a-m",
      testEndpoint: "a-m",
    },
    {
      title: "From K to Z",
      description: "Continue learning the American Sign Language from K to Z!",
      lessons: [
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ],
      completedLessons: ["n", "o", "p", "q"],
      courseEndpoint: "n-z",
      testEndpoint: "n-z",
    },
  ];

  return (
    <Container h="100vh" size="lg">
      <UserButton />
      <Box mt="lg" h="60%">
        <Title>My courses</Title>
        <ProgressCard mt="md" />
        <Card radius="md" px="xl" mt="md" withBorder bg="blue">
          <Stack gap="xl" justify="center">
            {mockData.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                description={course.description}
                lessons={course.lessons}
                completedLessons={course.completedLessons}
                courseEndpoint={"a-m"}
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
      </Box>
    </Container>
  );
}
