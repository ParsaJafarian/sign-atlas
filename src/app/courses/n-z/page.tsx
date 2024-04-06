"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Stepper,
  Timeline,
  Title,
  Text,
  Group,
  Button,
  Image,
  Center,
  Container,
  rem,
  Paper,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import ASLTranslator from "@/components/ASLTranslator";
import ASL3DHand from "@/components/ASL3DHand";
import { Canvas } from "@react-three/fiber";

export default function CourseId({ params }: { params: { id: string } }) {
  const [active, setActive] = useState(0);
  const lessons = [
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const nextStep = () => {
    setActive((current) =>
      current < lessons.length - 1 ? current + 1 : current
    );
    // setCompletedLessons((prev) => [...prev, lessons[active]]);
    setCompletedLessons((prev) => [...prev, lessons[active]]);
    // setCompletedLessons((prev) => [...prev, lessons[active + 1]]);
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Container h="89vh" maw={"80%"}>
      <Flex
        pt="50px"
        mah={"100%"}
        // gap={rem(100)}
        justify="center"
        align="stretch"
        direction="row"
        wrap="nowrap"
        style={{ overflow: "hidden" }}
      >
        <Box pr="5rem">
          <Timeline
            active={active}
            bulletSize={24}
            lineWidth={2}
            style={{
              transition: "all 1.5s",
              transform: `translateY(-${active * 60}px)`,
            }}
          >
            {lessons.map((lesson, index) => (
              <Timeline.Item
                key={index}
                bullet={
                  completedLessons.includes(lesson) && <IconCheck size={12} />
                }
                title={`Lesson ${index}`}
              >
                <Text c="dimmed" size="sm">
                  {lesson.toUpperCase()}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </Box>
        <Container fluid m={0} p={0} flex={1}>
          <Flex
            h={"100%"}
            // gap="md"
            justify="center"
            align="stretch"
            direction="column"
            wrap="nowrap"
          >
            <Center>
              <Text
                size={rem(30)}
                fw={900}
                variant="gradient"
                gradient={{ from: "grape", to: "pink", deg: 90 }}
              >
                Course A-M
              </Text>
            </Center>
            <Center>
              <Text
                size={rem(30)}
                fw={900}
                variant="gradient"
                gradient={{ from: "pink", to: "grape", deg: 90 }}
              >
                Lesson {lessons[active]}
              </Text>
            </Center>
            <Center style={{ flexGrow: 1 }} m={0} p={0} bg="red">
              <Paper h={"100%"} w={"100%"}>
                <Canvas camera={{ fov: 90 }}>
                  <ASL3DHand letter={lessons[active]} />
                </Canvas>
              </Paper>
              {/* Placeholder for {lessons[active]} 3D Hand model */}
            </Center>
            {/* <Image
              radius="md"
              src="https://upload.wikimedia.org/wikipedia/commons/2/27/Sign_language_A.svg"
              alt="A in American Sign Language"
              style={{ flex: "1 0 auto" }}
            /> */}
            <Flex
              gap="xs"
              justify="center"
              align="center"
              direction="row"
              wrap="wrap"
              mt="xl"
            >
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>Next lesson</Button>
            </Flex>
          </Flex>
        </Container>
        <Container m={0} p={0}>
          <ASLTranslator />
        </Container>
      </Flex>
    </Container>
  );
}
