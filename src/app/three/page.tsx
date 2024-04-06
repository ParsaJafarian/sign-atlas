"use client";

import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { Paper } from "@mantine/core";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef } from "react";

const Scene = ({ letter }: { letter: string }) => {
  const stl: any = useLoader(GLTFLoader, `${letter}.gltf`);
  // const stl = useLoader(STLLoader, `abb ${letter} print.STL`);

  return <primitive object={stl.scene} scale={0.3} position={[0, 0, 0]} />;
};

export default function Three() {
  const cameraRef = useRef<CameraControls | null>(null!);
  // const model = useLoader(STLLoader, 'abb O print.STL');

  function initLocAndRot() {
    if (!cameraRef.current) return;
    // POS (x,y,z) + LOOK POS (x,y,z)
    cameraRef.current.setLookAt(0, 0, 30, 0, 0, 0);
  }

  return (
    <Paper h="90vh">
      <Canvas camera={{ fov: 90 }}>
        <Scene letter={"h"} />
        <CameraControls
          ref={(ref) => {
            cameraRef.current = ref;
            if (ref) {
              initLocAndRot();
            }
          }}
        />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[0, 30, -30]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[30, 0, 30]} decay={0} intensity={Math.PI} />
        <pointLight position={[-30, 0, -30]} decay={0} intensity={Math.PI} />
        <pointLight position={[30, 0, -30]} decay={0} intensity={Math.PI} />
        <pointLight position={[-30, 0, 30]} decay={0} intensity={Math.PI} />
        {/* This box is actually at the 0,0,0 position */}
        {/* <Box position={[0, 0, 0]} /> */}
      </Canvas>
    </Paper>
  );
}
