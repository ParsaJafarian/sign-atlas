"use client";

import { Canvas } from "@react-three/fiber";
import { Paper } from "@mantine/core";
import ASL3DHand from "@/components/ASL3DHand";

export default function Three() {
  return (
    <Paper h="90vh">
      <Canvas>
        <ASL3DHand letter="k" />
      </Canvas>
    </Paper>
  );
}
