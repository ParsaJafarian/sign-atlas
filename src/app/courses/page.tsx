import CourseCard from "@/components/CourseCard";
import { ProgressCard } from "@/components/ProgressCard";
import { UserButton } from "@/components/UserButton";
import { Container, Title, Box, Stack, Card } from "@mantine/core";

export default function Courses() {

  interface ModuleList {
    [key: string]: boolean;
  }

  interface Course {
    title: string;
    description: string;
    modules: ModuleList;
  }

  const mockData: Course[] = [
    {
      title: "From A to M",
      description: "Learn the American Sign Language from A to M!",
      modules: {
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        h: false,
        i: false,
        j: false,
        k: false,
        l: false,
        m: false,
      },
    },
    {
      title: "From N to Z",
      description: "Continue learning the American Sign Language from K to Z!",
      modules: {
        n: false,
        o: false,
        p: false,
        q: false,
        r: false,
        t: false,
        u: false,
        v: false,
        w: false,
        x: false,
        y: false,
        z: false,
      },
    },
  ];

  return (
    <Container h="100vh" size="lg">
      <UserButton />
      <Box mt="lg" h="60%">
        <Title>My courses</Title>
        <ProgressCard mt="md" />
        <Card h="100%" radius="md" px="xl" mt="md" withBorder bg="blue">
          <Stack h="100%" gap="xl" justify="center">
            {mockData.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                description={course.description}
                modules={course.modules}
              />
            ))}
          </Stack>
        </Card>
      </Box>
    </Container>
  );
}
