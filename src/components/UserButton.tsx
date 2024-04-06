import { UnstyledButton, Group, Avatar, Text, rem } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./UserButton.module.css";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/effects";

export function UserButton() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => getCurrentUser(setUser), []);

  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user?.name || "Hans Spoonlicker"}
          </Text>

          <Text c="dimmed" size="xs">
            {user?.email || ""}
          </Text>
        </div>

        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  );
}
