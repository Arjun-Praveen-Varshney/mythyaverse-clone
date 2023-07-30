import React, { Component } from "react";
import { useRef, useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import "./style.css";

const Rehoboam = ({ radius, waveAmplitude, frequency, phase }) => {
  const canvasRef = useRef(null);
  const pointRadius = Math.random() * (2 - 0.5) + 0.5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let t = phase;
    let amplitude = waveAmplitude * (radius / 10);
    let amplitudeRange = 0.1 * amplitude;
    let amplitudeDelta = amplitudeRange / 60;
    let amplitudePhase = Math.random() * 2 * Math.PI;

    const drawCircle = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();

      const points = [];

      for (let angle = -0.01; angle <= 2 * Math.PI; angle += 0.05) {
        amplitude =
          waveAmplitude *
          (radius / 10) *
          (1 + Math.sin(amplitudePhase + t * 0.05) * amplitudeRange);
        const x =
          centerX +
          (radius + amplitude * Math.sin(angle * frequency + t)) *
            Math.cos(angle);
        const y =
          centerY +
          (radius + amplitude * Math.sin(angle * frequency + t)) *
            Math.sin(angle);
        points.push([x, y]);
      }

      for (let i = 0; i < points.length; i++) {
        const [x, y] = points[i];
        context.moveTo(x + pointRadius, y);
        context.arc(x, y, pointRadius, 0, 2 * Math.PI);
      }

      context.fillStyle = "white";

      context.closePath();
      context.fill();

      amplitudePhase += amplitudeDelta;
      t += 0.05;
      requestAnimationFrame(drawCircle);
    };

    if (!canvas) {
      console.error("Canvas not found!");
      return;
    }

    if (typeof radius !== "number") {
      console.error("Radius must be a number!");
      return;
    }

    drawCircle();
  }, [canvasRef, radius, waveAmplitude, frequency, phase, pointRadius]);

  return (
    <canvas
      ref={canvasRef}
      width={radius * 3}
      height={radius * 3}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        filter: "blur(2px)",
      }}
    />
  );
};

const AnimatedTriangle = ({
  radius,
  height,
  animationDuration,
  rotation,
  data,
}) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(rotation);

  const [textBlockData, setTextBlockData] = useState({
    title: "MythyaVerse",
    content: "",
  });

  const viewBox = `0 0 ${radius * 2} ${radius * 2}`;
  const preserveAspectRatio = "xMidYMid meet";
  const angle = Math.asin(height / (2 * radius)) * 2;
  const baseLength = 2 * radius * Math.cos(angle / 2) * 2;
  const bottomLeftX = radius - baseLength / 64;
  const bottomLeftY = radius + radius * Math.sin(angle / 2) * 4;
  const bottomRightX = radius + baseLength / 64;
  const bottomRightY = bottomLeftY;
  const topX = radius;
  const topY = bottomLeftY + (animationProgress / 100) * height;

  const [transforms, setTransforms] = useState({
    bottomLeftTransform: `rotate(${rotationAngle}, ${radius}, ${radius})`,
    bottomRightTransform: `rotate(${rotationAngle}, ${radius}, ${radius})`,
    topTransform: `rotate(${rotationAngle}, ${radius}, ${radius})`,
  });

  const path = `M${bottomLeftX},${bottomLeftY} L${bottomRightX},${bottomRightY} L${topX},${topY} Z`;

  const hexagonSideLength = baseLength / 128;
  const hexagonRadius = (hexagonSideLength * Math.sqrt(3)) / 2;
  const hexagonTopX = topX;
  const hexagonTopY = topY - hexagonRadius;
  let hexagonPoints = [
    [hexagonTopX, hexagonTopY - hexagonSideLength],
    [hexagonTopX + hexagonRadius, hexagonTopY - hexagonSideLength / 2],
    [hexagonTopX + hexagonRadius, hexagonTopY + hexagonSideLength / 2],
    [hexagonTopX, hexagonTopY + hexagonSideLength],
    [hexagonTopX - hexagonRadius, hexagonTopY + hexagonSideLength / 2],
    [hexagonTopX - hexagonRadius, hexagonTopY - hexagonSideLength / 2],
  ];

  const hexagonCenterX =
    hexagonPoints.reduce((sum, [x]) => sum + parseFloat(x), 0) /
    hexagonPoints.length;
  const hexagonCenterY =
    hexagonPoints.reduce((sum, [, y]) => sum + parseFloat(y), 0) /
    hexagonPoints.length;

  const lineCoordinates = {
    x1: 200,
    y1: 200,
    x2: hexagonCenterX - 30,
    y2: hexagonCenterY - 30,
    x3: hexagonCenterX,
    y3: hexagonCenterY,
  };

  hexagonPoints = hexagonPoints.map((point) => point.join(",")).join(" ");

  useEffect(() => {
    let animationStartTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!animationStartTime) {
        animationStartTime = timestamp;
      }
      const progress = Math.min(
        (timestamp - animationStartTime) / animationDuration,
        1
      );
      setAnimationProgress(progress * 100);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [animationDuration, textBlockData, rotationAngle, transforms]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTextBlockData(data[index]);
      if (index < data.length - 1) {
        index++;
      } else {
        index = 0;
      }
    }, animationDuration + 3500);
    return () => {
      clearInterval(interval);
    };
  }, [data]);

  const rotationAngleRef = useRef(rotation);
  useEffect(() => {
    rotationAngleRef.current = rotationAngle;
  }, [rotationAngle]);

  useEffect(() => {
    if (rotationAngleRef.current + 72 <= 359) {
      setRotationAngle(rotationAngleRef.current + 72);
    } else {
      setRotationAngle(0);
    }
  }, [textBlockData]);

  useEffect(() => {
    setTransforms({
      bottomLeftTransform: `rotate(${rotationAngle}, ${radius}, ${radius})`,
      bottomRightTransform: `rotate(${rotationAngle}, ${radius}, ${radius})`,
      topTransform: `rotate(${rotationAngle}, ${radius}, ${radius})`,
    });
  }, [rotationAngle, radius]);

  return (
    <>
      <svg
        width={radius * 3}
        viewBox={viewBox}
        preserveAspectRatio={preserveAspectRatio}
      >
        <defs>
          <pattern
            id="dot-pattern"
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2.5" cy="2.5" r="1" fill="white" />
          </pattern>
        </defs>
        <path
          d={path}
          fill="url(#dot-pattern)"
          transform={`${transforms.bottomLeftTransform} ${transforms.bottomRightTransform} ${transforms.topTransform}`}
          style={{ filter: "blur(1px)" }}
        />
        {animationProgress === 100 && (
          <path
            d={`M ${hexagonPoints} Z`}
            fill="transparent"
            stroke="white"
            transform={`${transforms.bottomLeftTransform} ${transforms.bottomRightTransform} ${transforms.topTransform}`}
          />
        )}

        <path
          d={`M${lineCoordinates.x1},${lineCoordinates.y1} L${lineCoordinates.x2},${lineCoordinates.y2}, L${lineCoordinates.x3},${lineCoordinates.y3}`}
          stroke="gray"
          fill="transparent"
          transform={`${transforms.bottomLeftTransform} ${transforms.bottomRightTransform} ${transforms.topTransform}`}
        />
      </svg>
      <div className="text-block">
        <Link to={textBlockData.link}>
          <Typewriter
            options={{
              strings: [textBlockData.title],
              autoStart: true,
              pauseFor: 1500,
              delay: 50,
            }}
          />
        </Link>
      </div>
    </>
  );
};

export default function RehoboamComponent() {
  const data = [
    {
      title: "Spiritual Wellness",
      link: "/products?name=mentalHealth",
    },
    {
      title: "Education",
      link: "/products?name=education",
    },
    {
      title: "Cultural Tourism",
      link: "/products?name=culturalTourism",
    },
    {
      title: "Automotive",
      link: "/products?name=automotive",
    },
    {
      title: "MythyaVerse",
      link: "/products?name=content",
    },
  ];

  const circles = [
    { radius: 200, waveAmplitude: 0.2, frequency: 25, phase: 0.5 },
    { radius: 200, waveAmplitude: 0.2, frequency: 20, phase: 1 },
    { radius: 200, waveAmplitude: 0.1, frequency: 20, phase: 1.5 },
    { radius: 200, waveAmplitude: 0.2, frequency: 15, phase: 2 },
  ];

  return (
    <div className="parent">
      {circles.map((circle, index) => (
        <Rehoboam key={index} {...circle} />
      ))}
      <AnimatedTriangle
        radius={200}
        height={65}
        rotation={0}
        animationDuration={500}
        data={data}
      />
    </div>
  );
}
