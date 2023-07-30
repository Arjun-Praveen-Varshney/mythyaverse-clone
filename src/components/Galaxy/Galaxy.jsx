import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

// Parameters

// Galaxy
const Galaxy = ({ scale, colorOne, colorTwo }) => {
  const parameters = {
    count: 5000,
    size: 0.01,
    radius: 5,
    branches: 3,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: colorOne,
    outsideColor: colorTwo,
    scaleFactor: 0.5,
    yFactor: 3,
  };
  const meshRef = useRef();
  const scaleFactor = scale || parameters.scaleFactor;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.001;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = 0.75;
    }
  }, []);

  // Geometry
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * parameters.radius;
    const spinAngle = radius * parameters.spin;
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    const distanceFromCenter = Math.sqrt(
      positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2
    );

    const yScale =
      parameters.yFactor * (1 - distanceFromCenter / parameters.radius);

    positions[i3] =
      (Math.cos(branchAngle + spinAngle) * radius + randomX) * scaleFactor;
    positions[i3 + 1] = (randomY * yScale + positions[i3 + 1]) * scaleFactor;
    positions[i3 + 2] =
      (Math.sin(branchAngle + spinAngle) * radius + randomZ) * scaleFactor;

    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // Material
  const material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  // Mesh
  return <points ref={meshRef} geometry={geometry} material={material} />;
};

export default Galaxy;
