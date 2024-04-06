/* eslint-disable react-hooks/exhaustive-deps */
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
  const lessons = [
    "RED",
    "BLUE",
    "GREEN",
    "YELLOW",
    "ORANGE",
    "PURPLE",
    "PINK",
    "BROWN",
    "BLACK",
    "WHITE",
    "GRAY",
    "BEIGE",
  ];
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [active, setActive] = useState(0);

  const [sentence, setSentence] = useState<string>("");
  const [currentWord, setCurrentWord] = useState<string>(lessons[0]);
  const [isWrong, setIsWrong] = useState(false);
  const [isCourseFinished, setIsCourseFinished] = useState(false);
  const inTransition = useRef(false);
  const [shakeCorrect, setShakeCorrect] = useState(false);
  const sentenceWord = useRef("");
  const currentWordWord = useRef(lessons[0]);

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
    if (
      count > nConfident &&
      category !== "None" &&
      category !== "Unsure" &&
      !inTransition.current
    ) {
      count = 0;
      if (
        sentenceWord.current === "" ||
        (sentenceWord.current.length === 1 &&
          sentenceWord.current[0] !== currentWordWord.current[0])
      ) {
        setSentence(category);
        sentenceWord.current = category;
      } else if (
        sentenceWord.current[sentenceWord.current.length - 1] ===
        currentWordWord.current[sentenceWord.current.length - 1]
      ) {
        setSentence((prevSentence) => {
          sentenceWord.current = prevSentence + category;
          return prevSentence + category;
        });
      } else {
        setSentence((prevSentence) => {
          sentenceWord.current =
            prevSentence.slice(0, prevSentence.length - 1) + category;
          return prevSentence.slice(0, prevSentence.length - 1) + category;
        });
      }
    } else if (count > nConfident) {
      count = 0;
    }
  }

  function finishedCourse() {}

  useEffect(() => {
    if (isCourseFinished || inTransition.current || sentence === "") return;
    if (sentence[sentence.length - 1] !== currentWord[sentence.length - 1]) {
      setIsWrong(true); // Set isWrong to true if sentence is wrong
      const timeout = setTimeout(() => {
        setIsWrong(false); // Reset isWrong after some time
      }, 500); // Adjust timeout duration as needed

      return () => clearTimeout(timeout); // Cleanup function to clear timeout
    } else {
      inTransition.current = true;
      setShakeCorrect(true);
      if (currentWord === sentence) {
        if (currentWord === lessons[lessons.length - 1]) {
          inTransition.current = false;
          setShakeCorrect(false);
          setIsCourseFinished(true);
          finishedCourse();
        }
        const timeout = setTimeout(() => {
          inTransition.current = false;
          setShakeCorrect(false);
          setCompletedLessons((oldCompletedLessons) => [
            ...oldCompletedLessons,
            currentWord,
          ]);
          setActive((old) => old + 1);
          setSentence("");
          sentenceWord.current = "";
          setCurrentWord((prevLetter) => {
            return lessons[lessons.indexOf(prevLetter) + 1];
          });
          currentWordWord.current = lessons[active + 1];
        }, 1500); // Adjust timeout duration as needed
        return () => clearTimeout(timeout); // Cleanup function to clear timeout
      }
      const timeout = setTimeout(() => {
        inTransition.current = false;
        setShakeCorrect(false);
      }, 1500); // Adjust timeout duration as needed

      return () => clearTimeout(timeout); // Cleanup function to clear timeout
    }
  }, [sentence, currentWord, isCourseFinished]);

  function restartCourse() {
    inTransition.current = false;
    setShakeCorrect(false);
    setCompletedLessons([]);
    setActive(0);
    setSentence("");
    sentenceWord.current = "";
    setCurrentWord(lessons[0]);
    currentWordWord.current = lessons[0];
    setIsWrong(false);
    setIsCourseFinished(false);
  }

  return (
    <Container h="89vh">
      {/* <Flex mt="md" h="100%" display="flex" > */}
      <Flex
        mah={"100%"}
        gap={rem(100)}
        justify="center"
        align="flex-start"
        direction="row"
        wrap="nowrap"
        style={{ paddingTop: "30px", overflow: "hidden" }}
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
        <Box>
          <Center>
            <Text
              size={rem(30)}
              fw={900}
              variant="gradient"
              gradient={{ from: "red", to: "grape", deg: 90 }}
            >
              Common colors
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
                <Title>{currentWord} </Title>
                {sentence === currentWord ? (
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
                      : sentence[sentence.length - 1] !==
                          currentWord[sentence.length - 1]
                        ? "red"
                        : "green",
                  color:
                    sentence === ""
                      ? undefined
                      : sentence[sentence.length - 1] !==
                          currentWord[sentence.length - 1]
                        ? "red"
                        : "green",
                  textDecoration: "underline",
                }}
                className={
                  sentence === ""
                    ? undefined
                    : isWrong
                      ? styles.shakeWrong
                      : sentence[sentence.length - 1] ===
                            currentWord[sentence.length - 1] && shakeCorrect
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
                      Good job! You finished the knowledge test about common
                      colors.
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
