import { Box, Button, Center, Group, Paper, Text, Title } from "@mantine/core";
import { IconBrain } from "@tabler/icons-react";
import classes from "./CourseCard.module.css";
import Link from "next/link";
interface CourseCardProps {
  title: string;
  description: string;
  lessons: string[];
  courseEndpoint: string;
  testEndpoint: string;
}

export default function CourseCard({
  title,
  description,
  lessons,
  courseEndpoint,
  testEndpoint,
}: CourseCardProps) {

  const completedLessons = [lessons[0], lessons[1]];

  return (
    <Paper h="130px" radius="md" shadow="xl" py={0}>
      <Group h="80%" justify="space-between" px="50px">
        <Box>
          <Title order={3}>{title}</Title>
          <Text>{description}</Text>
        </Box>
        <Center style={{ gap: "20px" }}>
          <Link href={"/courses/" + courseEndpoint}>
            <Button
              size="lg"
              variant="gradient"
              gradient={{ from: "pink", to: "cyan", deg: 90 }}
              className={classes.buttonHoverShadow}
            >
              Start
            </Button>
          </Link>
          <Link href={"/tests/" + testEndpoint}>
            <Button
              size="lg"
              rightSection={<IconBrain size={14} />}
              variant="gradient"
              gradient={{ from: "cyan", to: "grape", deg: 90 }}
              className={classes.buttonHoverShadow}
            >
              Practice
            </Button>
          </Link>
        </Center>
      </Group>
      <Group h="20%" w="100%" gap="xs" grow>
        {lessons.map((lesson, index) => (
          <Box
            key={index}
            bg={completedLessons.includes(lesson) ? "green" : "gray"}
            h="100%"
            style={{
              borderRadius:
                index === 0
                  ? "0 0 0 var(--mantine-radius-md)" // Bottom left box
                  : index === lessons.length - 1
                  ? "0 0 var(--mantine-radius-md) 0" // Bottom right box
                  : "0", // Middle boxes
            }}
          ></Box>
        ))}
      </Group>
    </Paper>
  );
}
