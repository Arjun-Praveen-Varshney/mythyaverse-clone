import React, { Suspense } from "react";
import { useThree } from "@react-three/fiber";
import { SparkStorm } from "./SparkStorm";
import { Planet } from "./Planet";
import InteractiveLogoModel from "../InteractiveLogoModel/InteractiveLogoModel";
import model from "../../assets/model-2.glb";

const colors = {
  malevolentIllusion: [
    "#c06995",
    "#de77c7",
    "#df86df",
    "#d998ee",
    "#ceadf4",
    "#c6bff9",
  ],
};

export const Controls = (props) => {
  const { gl, camera } = useThree();
  return <orbitControls args={[camera, gl.domElement]} {...props} />;
};

export function Scene() {
  return (
    <Suspense fallback={null}>
      <>
        <Controls enableZoom={false} />
        <pointLight distance={100} intensity={4} color="white" />
        <group>
          <InteractiveLogoModel url={model} />
          <SparkStorm
            count={200}
            colors={colors.malevolentIllusion}
            radius={8}
          />
        </group>
      </>
    </Suspense>
  );
}
