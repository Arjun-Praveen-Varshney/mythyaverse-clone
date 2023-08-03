import { Link, Outlet, useLocation } from "react-router-dom";
import CVltyicLogo from "../../assets/CVlytic/logo.png";
import Analytics from "./Analytics";
import Profile from "./Profile";
import Home from "./Home";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconAnalytics from "../../assets/CVlytic/icon-analytics.png";
import IconHome from "../../assets/CVlytic/icon-home.png";

import "./style.css";

function Dashboard() {
  const location = useLocation();
  return (
    <div className="min-h-screen py-10 overflow-y-auto bg-gradient-to-b from-[#1D1D22] to-[#070707]">
      <div className="flex justify-center">
        {location.pathname !== "/cvlytic/home" && (
          <div className="xl:w-1/5 w-1/4 text-white grow border-r-2 border-r-[#3b3b3b] mr-8">
            <nav className="list-none px-4">
              <li>
                <Link
                  to="/cvlytic/home"
                  className={`${
                    location.pathname === "/cvlytic/home" ? "bg-[#282829]" : ""
                  } flex my-16 p-4 xl:pl-8 rounded-lg`}
                >
                  <img src={IconHome} alt="" className="mr-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cvlytic/analytics"
                  className={`${
                    location.pathname === "/cvlytic/analytics"
                      ? "bg-[#282829]"
                      : ""
                  } flex my-16 p-4 xl:pl-8 rounded-lg`}
                >
                  <img src={IconAnalytics} alt="" className="mr-4" />
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  to="/cvlytic/profile"
                  className={`${
                    location.pathname === "/cvlytic/profile"
                      ? "bg-[#282829]"
                      : ""
                  } flex my-16 p-4 xl:pl-8 rounded-lg`}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-4 text-2xl my-auto"
                  />
                  Profile
                </Link>
              </li>
            </nav>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export { Analytics, Dashboard, Profile, Home };
