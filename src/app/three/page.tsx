"use client";

import { Canvas } from "@react-three/fiber";
import { Paper } from "@mantine/core";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef } from "react";
import ASL3DHand from "@/components/ASL3DHand";

export default function Three() {
  return (
    <Paper h="90vh">
      <Canvas camera={{ fov: 90 }}>
        <ASL3DHand letter="k" />
      </Canvas>
    </Paper>
  );
}
