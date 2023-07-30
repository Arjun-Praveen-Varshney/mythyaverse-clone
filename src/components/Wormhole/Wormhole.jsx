import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";
import { Canvas } from "@react-three/fiber";

function CameraControls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef();
  useFrame(() => controlsRef.current.update());

  return <orbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
}

const Tube = ({ index, rotateVertical }) => {
  const startY = -200 * index;
  const endY = 200;
  const resetY = -400;
  const radius = 3;
  const tubeLength = 200;
  const tubeVerts = new THREE.CylinderGeometry(
    radius,
    radius,
    tubeLength,
    128,
    256,
    true
  ).attributes.position;

  const colors = [];
  const noise = new ImprovedNoise();
  let p = new THREE.Vector3();
  let v3 = new THREE.Vector3();
  const noisefreq = 0.1;
  const noiseAmp = 0.5;
  const color = new THREE.Color();
  const hueNoiseFreq = 0.005;
  for (let i = 0; i < tubeVerts.count; i += 1) {
    p.fromBufferAttribute(tubeVerts, i);
    v3.copy(p);
    let vertexNoise = noise.noise(v3.x * noisefreq, v3.y * noisefreq, v3.z);
    v3.addScaledVector(p, vertexNoise * noiseAmp);
    tubeVerts.setXYZ(i, v3.x, p.y, v3.z);

    let colorNoise = noise.noise(
      v3.x * hueNoiseFreq,
      v3.y * hueNoiseFreq,
      i * 0.001 * hueNoiseFreq
    );
    color.setHSL(0.5 - colorNoise, 1, 0.5);
    colors.push(color.r, color.g, color.b);
  }

  const material = new THREE.PointsMaterial({ size: 0.03, vertexColors: true });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", tubeVerts);
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const points = useRef();
  const { camera, gl } = useThree();

  useEffect(() => {
    if (rotateVertical) {
      camera.position.set(0, 0, 10);
    } else {
      camera.position.set(0.5, 15, 0.5);
    }

    gl.setClearColor(0x000000);
  }, []);
  useEffect(() => {
    points.current.position.set(0, startY, 0);
  }, [startY]);

  useFrame(({ clock }) => {
    const delta = clock.getDelta();
    if (!rotateVertical) {
      points.current.rotation.y += 0.005;
      points.current.position.y += 100 * 0.001;
    } else {
      points.current.rotation.y += 0.0025;
      points.current.position.y += 100 * 0.000025;
    }

    if (points.current.position.y > endY) {
      points.current.position.y = resetY;
    }
  });

  return <points ref={points} geometry={geometry} material={material} />;
};

const Wormhole = ({ isStaticVertical }) => {
  return (
    <Canvas
      camera={{
        position: isStaticVertical ? [0, 0, 10] : [0.5, 15, 0.5],
        fov: 75,
      }}
      className={isStaticVertical ? "xl:block hidden" : ""}
    >
      <pointLight position={[10, 10, 10]} />
      <ambientLight />
      <Tube index={0} rotateVertical={isStaticVertical} />
      <Tube index={1} rotateVertical={isStaticVertical} />
    </Canvas>
  );
};

export default Wormhole;
