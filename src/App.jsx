import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from "react-transition-group";

import {
  Dashboard,
  Analytics as DashboardAnalytics,
  Profile as DashboardProfile,
  Home as DashboardHome,
} from "./pages/CVlytic/Dashboard";
import ContentPage from "./pages/Content";
import Home from "./pages/Home";
import ProductsPage from "./pages/Products";

import "./App.css";
import bgMusic from "./assets/audio-effects/bg-music.mp3";
import WormholeTransitionPage from "./pages/WormholeTransitionPage";

export default function App() {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const musicRef = useRef(null);

  const style = {
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url("/bg-image.jpg")`,
    backgroundSize: "contain",
    width: "100%",
    height: "100%",
    position: "fixed",
  };

  const bodyRef = useRef(null);

  function playBGMusic() {
    if (!musicRef) return;
    musicRef.current.volume = 0.2;
    if (!isPlaying) {
      setIsPlaying(true);
      musicRef.current.play();
    }
  }

  function handleMute() {
    musicRef.current.muted = !musicRef.current.muted;
    setMuted(musicRef.current.muted);
  }

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { pageX, pageY } = event;
      bodyRef.current.style.backgroundPosition = `${pageX / 20}px ${
        pageY / 20
      }px`;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      style={style}
      ref={bodyRef}
      className={
        location.pathname.startsWith("/cvlytic") ? "overflow-y-auto" : ""
      }
    >
      <TransitionGroup>
        <div className="ball-of-light"></div>
        <CSSTransition key={location.key} classNames="slide" timeout={700}>
          <SwitchTransition>
            <Routes location={location}>
              <Route
                path="/"
                exact
                element={<Home musicTrigger={playBGMusic} />}
              />
              <Route path="/content" exact element={<ContentPage />} />
              <Route path="/products" exact element={<ProductsPage />} />
              <Route
                path="/transition"
                exact
                element={<WormholeTransitionPage />}
              />
            </Routes>
          </SwitchTransition>
        </CSSTransition>
        <Routes>
          <Route path="/cvlytic" exact element={<Dashboard />}>
            <Route path="/cvlytic/home" exact element={<DashboardHome />} />
            <Route
              path="/cvlytic/analytics"
              exact
              element={<DashboardAnalytics />}
            />
            <Route
              path="/cvlytic/profile"
              exact
              element={<DashboardProfile />}
            />
          </Route>
        </Routes>
        <audio src={bgMusic} ref={musicRef}></audio>
        <button
          onClick={handleMute}
          className="mute-button text-white fixed z-50"
        >
          {" "}
          <div className={`mute-icon-${muted ? "static" : "animated"}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </TransitionGroup>
    </div>
  );
}
