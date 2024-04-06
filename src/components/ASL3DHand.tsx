import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { Paper } from "@mantine/core";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useRef } from "react";
import { Group } from "three";

export default function ASL3DHand({ letter }: any) {
  const cameraRef = useRef<CameraControls | null>(null!);
  const handRef = useRef<Group | null>(null!);
  // const model = useLoader(STLLoader, 'abb O print.STL');
  const Scene = ({ letter }: { letter: string }) => {
    const stl: any = useLoader(GLTFLoader, `/${letter}.gltf`);
    // const stl = useLoader(STLLoader, `abb ${letter} print.STL`);
    return (
      <primitive
        object={stl.scene}
        scale={0.2}
        position={[0, 0, 0]}
        dispose={null}
      />
    );
  };

  function initLocAndRot() {
    if (!cameraRef.current) return;
    // POS (x,y,z) + LOOK POS (x,y,z)
    cameraRef.current.setLookAt(0, 0, 30, 0, 0, 0);
  }

  useFrame(() => {
    if (handRef.current) {
      handRef.current.rotateY(0.01);
    }
  });

  return (
    <Suspense fallback={null}>
      <group ref={handRef} dispose={null}>
        <Scene letter={letter} />
      </group>
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
    </Suspense>
  );
}
