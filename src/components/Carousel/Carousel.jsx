import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import slideEffect from "../../assets/audio-effects/slide.mp3";
import "./style.css";

const Carousel = ({ items, callbackCurrentIndex }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const audioEffect = new Audio(slideEffect);

  useEffect(() => {
    callbackCurrentIndex(currentSlide);
  }, [currentSlide, callbackCurrentIndex]);

  const handlePrevSlide = () => {
    const nextSlide = (currentSlide + 1) % items.length;
    setCurrentSlide(nextSlide);
  };

  const handleNextSlide = () => {
    const nextSlide = (currentSlide - 1 + items.length) % items.length;
    setCurrentSlide(nextSlide);
  };

  const getSlideClasses = (index) => {
    if (index === currentSlide) {
      return "current-slide opacity-100 border-2";
    }
    if (
      index === currentSlide - 1 ||
      (currentSlide === 0 && index === items.length - 1)
    ) {
      return "prev-slide";
    }
    if (
      index === currentSlide + 1 ||
      (currentSlide === items.length - 1 && index === 0)
    ) {
      return "next-slide";
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
    <div className="relative flex xl:items-center items-start justify-center h-screen">
      {items.length > 1 && (
        <>
          <button
            className="absolute xl:top-1/2 lg:top-1/4 md:top-1/4 top-36 md:left-20 left-10 w-16 h-16 transform -translate-y-1/2 z-10 text-white text-4xl rounded-full bg-gray-700 hover:scale-110 hover:bg-gray-500 transition-all duration-300 flex items-center justify-center"
            onClick={() => {
              handlePrevSlide();
              audioEffect.play();
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-2xl" />
          </button>
          <button
            className="absolute xl:top-1/2 lg:top-1/4 md:top-1/4 top-36 md:right-20 right-10 w-16 h-16 transform -translate-y-1/2 z-10 text-white text-4xl rounded-full bg-gray-700 hover:scale-110 hover:bg-gray-500  transition-all duration-300 flex items-center justify-center"
            onClick={() => {
              handleNextSlide();
              audioEffect.play();
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
          </button>
        </>
      )}

      <div className="relative w-1/2 h-[50vh]">
        {items.map((video, index) => (
          <a href={video.link} target="_blank" key={index}>
            <img
              className={`absolute top-0 left-0 w-full rounded-xl p-2 border-white object-cover transition-opacity md:h-full h-1/2 md:mt-auto mt-10 ${getSlideClasses(
                index
              )}`}
              style={{
                transitionDuration: "300ms",
                transition: "transform 300ms ease",
              }}
              src={video.thumbnail}
              alt={video.caption}
            />
            <p
              className={`absolute xl:-bottom-20 xl:top-auto top-2/3 left-1/2 transform -translate-x-1/2 z-40 text-white text-center bg-gray-500 bg-opacity-40 p-2 px-4 rounded-xl transition-opacity ${getCaptionClasses(
                index
              )}`}
              style={{
                transitionDuration: "0ms",
              }}
            >
              {video.caption}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
