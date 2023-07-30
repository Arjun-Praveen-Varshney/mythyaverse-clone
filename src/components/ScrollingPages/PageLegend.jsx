import React from "react";
import PageContent from "./PageConent";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Page = ({ currentIndex, handler, subMenuState, toggleSubMenu }) => {
  const SubMenu = ({ subMenuState, toggleSubMenu }) => {
    const SubMenuContent = ({ className }) => {
      return (
        <ul
          className={
            className + " text-white text-sm pl-2 transition ease [&>li]:mb-2"
          }
        >
          <li className="hover:underline">
            <Link to="/transition?target=mentalHealth">Spiritual Wellness</Link>
          </li>
          <li className="hover:underline">
            <Link to="/transition?target=automotive">Automotive</Link>
          </li>
          <li className="hover:underline">
            <Link to="/transition?target=education">Education </Link>
          </li>
          <li className="hover:underline">
            <Link to="/transition?target=culturalTourism">
              Cultural Tourism
            </Link>
          </li>
          <li className="hover:underline">
            <Link to="/transition?target=others">Virtual Tours</Link>
          </li>
          <li className="hover:underline">
            <Link to="/transition?target=others">Product Demos</Link>
          </li>
          <li className="hover:underline">
            <Link to="/transition?target=others">Rock Museum</Link>
          </li>
        </ul>
      );
    };

    return (
      <span className="md:inline hidden">
        <button className="pl-2 text-white text-sm" onClick={toggleSubMenu}>
          <FontAwesomeIcon
            icon={faChevronUp}
            style={{
              transition: "all 1s ease",
              transform: `rotate(${subMenuState ? 0 : 180}deg)`,
            }}
          />
        </button>
        <SubMenuContent
          className={subMenuState ? "sm-active" : "sm-inactive"}
        />
      </span>
    );
  };

  return (
    <div
      className="pages-container 2xl:ml-0 lg:ml-5 ml-10 
        flex-col h-full"
    >
      {PageContent.map((page, index) => {
        let color = currentIndex === index ? "#de77c7" : "white";
        return (
          <div
            className="text-left 2xl:pl-10 lg:pl-5
            pages-item relative"
            onClick={() => handler(index)}
          >
            <h3
              style={{
                margin: 0,
                color: color,
                cursor: "pointer",
              }}
            >
              {page.title}
              {page.title === "PRODUCTS" && (
                <SubMenu
                  subMenuState={subMenuState}
                  toggleSubMenu={toggleSubMenu}
                />
              )}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
