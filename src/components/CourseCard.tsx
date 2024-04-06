import { Box, Button, Group, Paper, Text, Title } from "@mantine/core";

interface CourseCardProps {
  title: string;
  description: string;
  lessons: string[];
  completedLessons: string[];
  courseEndpoint: string;
  testEndpoint: string;
}

export default function CourseCard({
  title,
  description,
  lessons,
  completedLessons,
  courseEndpoint,
  testEndpoint,
}: CourseCardProps) {
  return (
    <Paper mih="130px" radius="md" shadow="xl" py={0}>
      <Group h="80%" justify="space-between" px="50px">
        <Box>
          <Title order={3}>{title}</Title>
          <Text>{description}</Text>
        </Box>
        <Button w="100px">Start</Button>
      </Group>
      <Group h="20%" w="100%" gap="xs" grow>
        {Object.entries(lessons).map(([lesson, completed]) => (
          <Box key={lesson} bg={completed ? "green" : "gray"} h="100%"></Box>
        ))}
      </Group>
    </Paper>
  );
}
