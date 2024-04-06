"use client";

import * as THREE from 'three'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Box from '@/components/Box3D'
import { Paper } from '@mantine/core';
// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const Scene = () => {
  const stl = useLoader(FBXLoader, "qq.fbx");

  return <primitive object={stl} scale={1} position={[0, 0, 0]} />;
};

export default function Three() {
    // const model = useLoader(STLLoader, 'abb O print.STL');

    return (
        <Paper h="80vh">            
            <Canvas>
                <OrbitControls />
                <Scene />
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <Box position={[0, 0, 0]} />
                {/* <primitive object={model} /> */}
            </Canvas>
        </Paper>
    )
}