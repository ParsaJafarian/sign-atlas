"use client";

import ASLTranslator from "@/components/ASLTranslator";
import {
  Box,
  Center,
  Container,
  Input,
  Title,
  Text,
  rem,
  Button,
  Divider,
  Timeline,
  Flex,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import styles from "./a.module.css";
import { IconCheck } from "@tabler/icons-react";
import Link from "next/link";

export default function Page() {
  const startLetter = "N";
  const endLetter = "Z";
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
  const [active, setActive] = useState(0);

  const [sentence, setSentence] = useState<string>("");
  const [currentLetter, setCurrentLetter] = useState<string>(startLetter);
  const [isWrong, setIsWrong] = useState(false);
  const [isCourseFinished, setIsCourseFinished] = useState(false);
  const inTransition = useRef(false);
  let lastCategory: string = "";
  let count = 0;
  const nConfident = 10;
  function getCategory(category: string) {
    // "Unsure" means there is a hand but below threshold
    // letters are letters
    // "None" means no hand was detected
    if (category === lastCategory) count += 1;
    else count = 1;
    lastCategory = category;

    if (count > nConfident && category !== "None" && category !== "Unsure") {
      count = 0;
      // setSentence((prevSentence) => {
      //   return prevSentence + category;
      // });
      if (!inTransition.current) {
        setSentence(category);
      }
    } else if (count > nConfident) {
      count = 0;
    }
  }

  function finishedCourse() {}

  useEffect(() => {
    if (isCourseFinished || inTransition.current || sentence === "") return;
    if (sentence !== currentLetter) {
      setIsWrong(true); // Set isWrong to true if sentence is wrong
      const timeout = setTimeout(() => {
        setIsWrong(false); // Reset isWrong after some time
      }, 500); // Adjust timeout duration as needed

      return () => clearTimeout(timeout); // Cleanup function to clear timeout
    } else {
      inTransition.current = true;
      setCompletedLessons((oldCompletedLessons) => [
        ...oldCompletedLessons,
        currentLetter,
      ]);
      setActive((old) => old + 1);
      const timeout = setTimeout(() => {
        if (currentLetter === endLetter) {
          const timeout = setTimeout(() => {
            setIsCourseFinished(true);
            finishedCourse();
          }, 1500); // Adjust timeout duration as needed
          return () => clearTimeout(timeout); // Cleanup function to clear timeout
        }
        inTransition.current = false;
        setSentence("");
        setCurrentLetter((prevLetter) => {
          const nextCharCode = prevLetter.charCodeAt(0) + 1;
          if (nextCharCode <= 90) {
            return String.fromCharCode(nextCharCode);
          } else {
            return "A";
          }
        });
      }, 1500); // Adjust timeout duration as needed

      return () => clearTimeout(timeout); // Cleanup function to clear timeout
    }
  }, [sentence, currentLetter, isCourseFinished]);

  function restartCourse() {
    inTransition.current = false;
    setCompletedLessons([]);
    setActive(0);
    setSentence("");
    setCurrentLetter(startLetter);
    setIsWrong(false);
    setIsCourseFinished(false);
  }

  return (
    <Container h="89vh">
      <Flex
        mah={"100%"}
        gap={rem(100)}
        justify="center"
        align="flex-start"
        direction="row"
        wrap="nowrap"
        style={{ paddingTop: "30px", overflow: "hidden" }}
      >
        <Box pr="5rem" style={{ overflow: "hidden" }}>
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
        <Box>
          <Center>
            <Text
              size={rem(30)}
              fw={900}
              variant="gradient"
              gradient={{ from: "red", to: "grape", deg: 90 }}
            >
              Alphabet {startLetter}-{endLetter}
            </Text>
          </Center>
          <Divider my="md" />
          <Center>
            <ASLTranslator
              getCategory={getCategory}
              confidenceThreshold={0.85}
            />
          </Center>
        </Box>
        <Box ml="md" flex="1">
          {!isCourseFinished ? (
            <>
              <Center maw="100%" h={100}>
                <Title>{currentLetter} </Title>
                {sentence === currentLetter ? (
                  <IconCheck size={60} strokeWidth={3} color={"#40bf4e"} />
                ) : undefined}
              </Center>
              <Center
                maw="100%"
                h={100}
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: "5px",
                  borderColor:
                    sentence === ""
                      ? undefined
                      : sentence !== currentLetter
                        ? "red"
                        : "green",
                  color:
                    sentence === ""
                      ? undefined
                      : sentence !== currentLetter
                        ? "red"
                        : "green",
                  textDecoration: "underline",
                }}
                className={
                  sentence === ""
                    ? undefined
                    : isWrong
                      ? styles.shakeWrong
                      : sentence === currentLetter
                        ? styles.shakeCorrect
                        : undefined
                }
              >
                <Text
                  size={rem(20)}
                  fw={900}
                  // variant="gradient"
                  // gradient={{ from: "red", to: "grape", deg: 90 }}
                >
                  {sentence}
                </Text>
              </Center>
            </>
          ) : (
            <>
              <Center mt="md" h="90%" display="flex">
                <Box>
                  <Center>
                    <Text
                      ta="center"
                      size={rem(50)}
                      fw={900}
                      variant="gradient"
                      gradient={{ from: "grape", to: "blue", deg: 0 }}
                    >
                      Good job! You finished the knowledge test {startLetter}-
                      {endLetter}.
                    </Text>
                  </Center>
                  <Center>
                    <Link style={{ marginTop: "40px" }} href="/courses">
                      <Button
                        variant="gradient"
                        gradient={{ from: "orange", to: "cyan", deg: 90 }}
                      >
                        Course List
                      </Button>
                    </Link>
                    <Button
                      style={{ marginTop: "40px", marginLeft: "40px" }}
                      variant="gradient"
                      gradient={{ from: "cyan", to: "orange", deg: 90 }}
                      onClick={() => restartCourse()}
                    >
                      Restart the test
                    </Button>
                  </Center>
                </Box>
              </Center>
            </>
          )}
        </Box>
      </Flex>
    </Container>
  );
}
