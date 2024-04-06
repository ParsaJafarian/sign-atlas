"use client";

import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Image,
  rem,
} from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderMegaMenu.module.css";
import Link from "next/link";

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Image src="/logo.png" h="100%" alt="logo" />

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <Link href="/courses" className={classes.link}>
              Courses
            </Link>
          </Group>

          <Group visibleFrom="sm">
            <Link href="/login">
              <Button variant="default">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Link href="/login">
              <Button variant="default">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
