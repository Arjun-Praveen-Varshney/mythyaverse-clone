import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame, Canvas } from "@react-three/fiber";
import React, { useState, useRef } from "react";

function InteractiveRotatingGLTFModel({ url, lightRef }) {
  const gltf = useLoader(GLTFLoader, url);
  const meshRef = useRef();
  const ballRef = useRef();

  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [velocity, setVelocity] = useState({
    x: 0,
    y: 0,
  });

  useFrame(({ mouse }) => {
    if (lightRef.current) {
      lightRef.current.position.x = mouse.x * 10;
      lightRef.current.position.y = mouse.y * 10;
    }

    if (!isDragging) {
      if (meshRef.current) {
        meshRef.current.rotation.y += velocity.x * 0.001;
        meshRef.current.rotation.x += velocity.y * 0.001;

        setVelocity({
          x: velocity.x * 0.9,
          y: velocity.y * 0.9,
        });
      }
    }
    if (meshRef.current) meshRef.current.rotation.y += 0.01;
  });

  function handleMouseDown(event) {
    setIsDragging(true);
    setPreviousMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
    setVelocity({
      x: 0,
      y: 0,
    });
  }

  function handleMouseMove(event) {
    if (isDragging) {
      const { x, y } = event;
      const deltaX = x - previousMousePosition.x;
      const deltaY = y - previousMousePosition.y;

      if (meshRef.current) {
        meshRef.current.rotation.y += deltaX * 0.01;
        meshRef.current.rotation.x += deltaY * 0.01;
      }

      setPreviousMousePosition({ x, y });
      setVelocity({
        x: deltaX,
        y: deltaY,
      });
    }
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  return (
    <>
      <mesh
        ref={meshRef}
        onPointerDown={handleMouseDown}
        onPointerMove={handleMouseMove}
        onPointerUp={handleMouseUp}
        onPointerLeave={handleMouseUp}
        scale={[5, 5, 5]}
      >
        <primitive object={gltf.scene} />
      </mesh>
    </>
  );
}

export default function InteractiveLogoModel({ url }) {
  const lightRef = useRef();

  return (
    <Canvas className="pb-60">
      <pointLight position={[10, 10, 10]} ref={lightRef} intensity={2} />
      <InteractiveRotatingGLTFModel url={url} lightRef={lightRef} />
    </Canvas>
  );
}
