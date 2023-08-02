import { useState, useEffect } from "react";
import React from "react";
import Page from "../components/ScrollingPages/PageLegend";
import PageScroller from "../components/ScrollingPages/PageScroller";
import PageContent from "../components/ScrollingPages/PageConent";
import { extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MeshLine, MeshLineMaterial } from "../components/SparkStorm/MeshLine";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/mythyaverse-logo-glow.png";
import soundEffect2 from "../assets/audio-effects/effect-2.mp3";
import RehoboamComponent from "../components/Rehoboam/Rehoboam";

extend({ MeshLine, MeshLineMaterial, OrbitControls });

function MobileNavbar({ currentIndex, setCurrentIndex }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  return (
    <nav className="lg:hidden block">
      <div className="text-right pr-5">
        <button onClick={toggleNavbar} className="text-white text-lg">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div
        className={`${
          isNavbarOpen ? "block" : "hidden"
        } lg:hidden bg-black transition duration-300`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 absolute left-0 top-14 z-40 bg-black w-full rounded-xl backdrop-blur-sm bg-opacity-50 flex flex-col items-center ">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setIsNavbarOpen(false);
            }}
            className="block w-full px-3 py-2 text-base font-medium text-white focus:outline-2 outline-white hover:border-2 border-white"
          >
            About
          </button>
          <button
            onClick={() => {
              setCurrentIndex(1);
              setIsNavbarOpen(false);
            }}
            className="block w-full px-3 py-2 text-base font-medium text-white focus:outline-2 outline-white hover:border-2 border-white"
          >
            Products
          </button>
          <button
            onClick={() => {
              setCurrentIndex(2);
              setIsNavbarOpen(false);
            }}
            className="block w-full px-3 py-2 text-base font-medium text-white focus:outline-2 outline-white hover:border-2 border-white"
          >
            Team
          </button>
          <button
            onClick={() => {
              setCurrentIndex(3);
              setIsNavbarOpen(false);
            }}
            className="block w-full px-3 py-2 text-base font-medium text-white focus:outline-2 outline-white hover:border-2 border-white"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}

export default function ContentPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalIndexes = PageContent.length - 1;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const targetSectionIndex = searchParams.get("section");

  useEffect(() => {
    if (
      targetSectionIndex &&
      targetSectionIndex < totalIndexes &&
      targetSectionIndex > -1
    ) {
      _handleIndexChange(targetSectionIndex);
    }
  }, []);

  const _handleIndexChange = (index) => {
    if (index !== currentIndex) {
      playEffectSound(soundEffect2);
      setCurrentIndex(index);
      window.history.replaceState(
        null,
        "MythyaVerse - Where Unreal becomes Real",
        "/content?section=" + index
      );
      setSubMenuState(false);
    }
  };

  let scrollCount = 0;

  const _handlePageScroll = (e) => {
    const delta = Math.sign(e.deltaY);
    scrollCount += e.deltaY;
    if (scrollCount > 300 || scrollCount < 0) {
      const newIndex = currentIndex + delta;
      if (newIndex >= 0 && newIndex <= totalIndexes) {
        _handleIndexChange(currentIndex + delta);
      }
    }
  };

  const playEffectSound = (effectAudio) => {
    const effect = new Audio(effectAudio);
    effect.play();
  };

  const lockScroll = React.useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = React.useCallback(() => {
    document.body.style.overflowY = "scroll";
  }, []);

  const [subMenuState, setSubMenuState] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuState(!subMenuState);
  };

  lockScroll();

  return (
    <div>
      <header
        id="header"
        className="scaled-header flex justify-between items-center relative"
      >
        <Link
          to="/"
          className="relative z-30 text-2xl text-white font-bold flex items-center"
        >
          <img src={logo} className="md:h-16 min-[375px]:h-16 h-10"></img>
          <h1 id="title">MYTHYAVERSE</h1>
        </Link>
        <MobileNavbar
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </header>
      <main
        className="relative h-screen z-40 md:ml-5 ml-0 flex items-start"
        onWheel={(e) => _handlePageScroll(e)}
      >
        <div
          className={`${
            currentIndex === 0 || currentIndex === 4 ? "xl:w-[60%]" : "w-full"
          } px-5 flex mt-28 justify-start`}
        >
          <div className="lg:flex hidden h-fit min-w-[157px]">
            <PageScroller
              orientation={"vertical"}
              onChange={_handleIndexChange}
              currentIndex={currentIndex}
              subMenuState={subMenuState}
            />
            <Page
              currentIndex={currentIndex}
              className="w-1/4"
              handler={_handleIndexChange}
              toggleSubMenu={toggleSubMenu}
              subMenuState={subMenuState}
            />
          </div>
          <div
            className={`${
              currentIndex === 1
                ? "max[425px]:pr-7 max[425px]:pl-3 pr-0 pl-0"
                : "pr-7 pl-3"
            } 2xl:px-20 xl:px-10 lg:px-10 md:h-full h-[75vh] w-full text-white text-justify overflow-y-auto overflow-x-hidden custom-scrollbar`}
          >
            {PageContent[currentIndex].element()}
          </div>
        </div>
        <div
          className={
            currentIndex === 0 || currentIndex === 4
              ? "xl:block hidden mt-20"
              : "hidden"
          }
        >
          <RehoboamComponent />
        </div>
      </main>

      <div className="mousey mb-4">
        <div className="scroller"></div>
      </div>
    </div>
  );
}
