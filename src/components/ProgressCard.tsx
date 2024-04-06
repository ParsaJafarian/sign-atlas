import { Text, Progress, Card } from "@mantine/core";
import { BoxProps } from "@mantine/core";

export function ProgressCard(props: BoxProps) {
  return (
    <Card
      withBorder
      radius="md"
      padding="xl"
      bg="var(--mantine-color-body)"
      {...props}
    >
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Progress
      </Text>
      <Text fz="lg" fw={500}>
        54%
      </Text>
      <Progress value={54} mt="md" size="lg" radius="xl" />
    </Card>
  );
}
