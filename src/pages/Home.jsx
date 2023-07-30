import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import soundEffect1 from "../assets/audio-effects/effect-1.mp3";
import bgVideo from "../assets/bg-video.webm";
import logo from "../assets/mythyaverse-logo-glow.png";

export default function Home({ musicTrigger }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { pageX, pageY } = event;
      setPos({ x: pageX, y: pageY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const style = {
    transform: `scale(1.2) translateX(${pos.x / 20}px) translateY(${
      pos.y / 20
    }px)`, // adjust the division to control the movement
  };

  const playEffectSound = (effectAudio) => {
    const effect = new Audio(effectAudio);
    effect.play();
  };

  const _handleExperienceStart = () => {
    playEffectSound(soundEffect1);
    setShouldAnimate(true);
    musicTrigger();
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="App overflow-hidden">
        <video
          id="bgVideo"
          autoPlay
          loop
          muted
          style={style}
          className={`${
            shouldAnimate ? "hidden-video" : "shown-video"
          } fixed z-20 w-auto min-w-full min-h-full max-w-none`}
        >
          <source src={bgVideo} />
          Your browser does not support the video tag.
        </video>
        <header
          id="header"
          className={`${
            shouldAnimate
              ? "h-auto"
              : "relative flex items-center justify-center h-screen w-screen"
          }`}
        >
          <div className="relative z-30 p-5 text-2xl text-white">
            {!shouldAnimate && <img src={logo} className="m-auto"></img>}
            <h2
              className={`${
                shouldAnimate
                  ? "scaled-header"
                  : "default-header md:text-4xl text-2xl my-2"
              }`}
            >
              WELCOME TO
            </h2>

            <h1
              id="title"
              className={`${
                shouldAnimate
                  ? "scaled-logo"
                  : "default-logo lg:text-8xl md:text-7xl text-4xl font-bold tracking-light border-b-2 pb-2 mb-4"
              }`}
            >
              {shouldAnimate && (
                <img src={logo} style={{ height: "4rem" }}></img>
              )}
              MYTHYAVERSE
            </h1>

            <h2
              className={`${
                shouldAnimate
                  ? "scaled-header"
                  : "default-header md:text-4xl text-2xl  my-2 mb-10 default-header"
              }`}
            >
              Where Unreal Becomes Real
            </h2>
            <Link
              to="/content"
              className={`${
                shouldAnimate
                  ? "scaled-header"
                  : "default-header bg-white text-black text-sm p-4 hvr-sweep-to-right"
              }`}
              onClick={() => _handleExperienceStart()}
            >
              EXPLORE THE MYTHYAVERSE
            </Link>
          </div>
        </header>
      </div>
    </Suspense>
  );
}
