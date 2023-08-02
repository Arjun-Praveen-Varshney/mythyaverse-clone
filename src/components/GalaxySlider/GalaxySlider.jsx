import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import slideEffect from "../../assets/audio-effects/slide.mp3";
import "./style.css";

const Circle = ({ gotoNextSlide, gotoPrevSlide, className }) => {
  const curveEl = useRef(null);
  const thumbEl = useRef(null);
  const rangeEl = useRef(null);
  const [slideDirection, setSlideDirection] = useState("center");

  const slideCycler = () => {
    if (slideDirection === "left") {
      gotoPrevSlide();
    } else if (slideDirection === "right") {
      gotoNextSlide();
    }
  };

  useEffect(() => {
    slideCycler();
  }, [slideDirection]);

  useEffect(() => {
    const curve = {
      x: 0,
      y: 50,
      cpx: 250,
      cpy: 100,
      endx: 450,
      endy: 50,
    };

    let percent = 0.5;

    // get the XY at the specified percentage along the curve
    const getQuadraticBezierXYatPercent = (curve, percent) => {
      let x =
        Math.pow(1 - percent, 2) * curve.x +
        2 * (1 - percent) * percent * curve.cpx +
        Math.pow(percent, 2) * curve.endx;
      let y =
        Math.pow(1 - percent, 2) * curve.y +
        2 * (1 - percent) * percent * curve.cpy +
        Math.pow(percent, 2) * curve.endy;

      return { x, y };
    };

    const drawCurve = () => {
      curveEl.current.setAttribute(
        "d",
        `M${curve.x},${curve.y} Q${curve.cpx},${curve.cpy} ${curve.endx},${curve.endy}`
      );
    };

    const drawThumb = (percent) => {
      let pos = getQuadraticBezierXYatPercent(curve, percent);
      thumbEl.current.setAttribute("cx", pos.x);
      thumbEl.current.setAttribute("cy", pos.y);
    };

    const moveThumb = (e) => {
      console.log(e.target.value);
      const value = e.target.value;
      percent = value / 100;
      if (value >= 1 && value <= 25 && slideDirection !== "left") {
        setSlideDirection("left");
      } else if (value >= 75 && value <= 100 && slideDirection !== "right") {
        setSlideDirection("right");
      } else {
        setSlideDirection("center");
      }
      drawThumb(percent);
    };

    const recenterThumb = (e) => {
      drawThumb(0.5);
      rangeEl.current.value = 50;
    };

    // event on the range input
    rangeEl.current.value = percent * 100;
    rangeEl.current.addEventListener("input", moveThumb);
    rangeEl.current.addEventListener("mouseup", recenterThumb);
    drawCurve();
    drawThumb(percent);
  }, []);

  return (
    <div
      className={`${className} absolute bottom-[13rem] left-1/2 -translate-x-1/2`}
    >
      <div className="wrap">
        <div className="slider-container">
          <input id="range" type="range" min="1" max="100" ref={rangeEl} />
          <svg id="slider" height="100" width="450">
            <circle id="thumb" stroke="#fff" fill="#fff" r="10" ref={thumbEl} />
            <path
              id="curve"
              stroke="#fff"
              strokeWidth="4"
              fill="none"
              ref={curveEl}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const Carousel = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const audioEffect = new Audio(slideEffect);

  const handlePrevSlide = () => {
    const prevSlide = (currentSlide + 1) % items.length;
    setCurrentSlide(prevSlide);
  };

  const handleNextSlide = () => {
    const nextSlide = (currentSlide - 1 + items.length) % items.length;
    setCurrentSlide(nextSlide);
  };

  const getSlideClasses = (index) => {
    if (index === currentSlide) {
      return "current-galaxy opacity-100";
    } else if (
      index === currentSlide - 1 ||
      (currentSlide === 0 && index === items.length - 1)
    ) {
      return "prev-galaxy";
    } else if (
      index === currentSlide + 1 ||
      (currentSlide === items.length - 1 && index === 0)
    ) {
      return "next-galaxy";
    }
    return "opacity-0 scale-75 -z-10";
  };

  const getCaptionClasses = (index) => {
    if (index === currentSlide) {
      return "opacity-100";
    }
    return "opacity-0 scale-50 translate-x-full";
  };

  return (
    <div className="relative flex xl:items-center items-start justify-center md:h-screen h-fit">
      {items.length > 1 && (
        <>
          <button
            className="absolute xl:top-2/3 lg:top-3/4 md:top-3/4 top-[65vh] md:left-1/4 max[425px]:left-20 left-0 w-16 h-16 z-10 text-white text-4xl rounded-full bg-gray-700 hover:scale-110 hover:bg-gray-500 transition-all duration-300 flex items-center justify-center"
            onClick={() => {
              handlePrevSlide();
              audioEffect.play();
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-2xl" />
          </button>
          <button
            className="absolute xl:top-2/3 lg:top-3/4 md:top-3/4 top-[65vh] md:right-1/4 max[425px]:right-20 right-0  w-16 h-16 z-10 text-white text-4xl rounded-full bg-gray-700 hover:scale-110 hover:bg-gray-500  transition-all duration-300 flex items-center justify-center"
            onClick={() => {
              handleNextSlide();
              audioEffect.play();
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
          </button>
        </>
      )}

      <div className="relative w-full md:h-screen h-[60vh]">
        {items.map((item, index) => (
          <div key={index}>
            <div
              className={`absolute top-0 left-0 w-full text-center p-2 object-cover transition-opacity h-full md:mt-auto mt-10 ${getSlideClasses(
                index
              )}`}
              style={{
                transitionDuration: "300ms",
                transition: "transform 300ms ease",
              }}
            >
              {item.element}
            </div>
            <a
              href={item.link}
              className={`absolute xl:bottom-[17rem] xl:top-auto md:top-2/3 top-[55vh] left-1/2 transform -translate-x-1/2 z-40 text-white text-center bg-gray-500 bg-opacity-40 p-2 px-4 rounded-xl transition-opacity ${getCaptionClasses(
                index
              )}`}
              style={{
                transitionDuration: "0ms",
              }}
            >
              {item.caption}
            </a>
          </div>
        ))}
        <Circle
          gotoNextSlide={handleNextSlide}
          gotoPrevSlide={handlePrevSlide}
          className="md:block hidden"
        />
      </div>
    </div>
  );
};

export default Carousel;
