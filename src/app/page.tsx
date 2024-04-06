"use client";

import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import classes from "./HeroBullets.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <Container size="xl">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            UNLOCK THE WORLD OF SIGN LANGUAGE WITH <br />{" "}
            <span className={classes.highlight}>SIGN ATLAS</span>
          </Title>
          <Text c="dimmed" mt="lg">
            Experience the power of 3D visualization as you learn to communicate
            through <br />
            gestures. Our innovative platform brings sign language to life,
            allowing you to explore <br />
            and practice with ease.
          </Text>

          <Text c="dimmed" mt="sm">
            With our cutting-edge gesture recognition technology, hone your
            skills with real-time <br />
            feedback. Whether you &apos; re a beginner or looking to enhance
            your fluency, Sign Atlas <br />
            is here to guide you every step of the way.
          </Text>

          <List
            mt={50}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Visualizations in 3D </b> - Experience ASL like never before
              with immersive 3D visualizations.
            </List.Item>
            <List.Item>
              <b>Computer vision</b> - Harness the power of computer vision to
              learn ASL with real-time feedback.
            </List.Item>
            <List.Item>
              <b>Multiple courses and levels </b> - Explore a *range of courses
              and levels tailored to your learning journey in ASL.
            </List.Item>
          </List>

          <Group mt={50}>
            <Link href="/courses">
              <Button radius="xl" size="md" className={classes.control} >
                Get started
              </Button>
            </Link>
          </Group>
        </div>
        <Image
          src="main.png"
          className={classes.image}
          alt="Man using Sign Atlas to practice his sign language skils"
        />
      </div>
    </Container>
  );
}
