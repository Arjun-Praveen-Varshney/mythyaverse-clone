import { Link, Outlet, useLocation } from "react-router-dom";
import CVltyicLogo from "../../assets/CVlytic/logo.png";
import Analytics from "./Analytics";
import Home from "./Home";

import IconAnalytics from "../../assets/CVlytic/icon-analytics.png";
import IconHome from "../../assets/CVlytic/icon-home.png";

import "./style.css";

function Dashboard() {
  const location = useLocation();
  return (
    <div className="min-h-screen py-10 overflow-y-auto bg-gradient-to-b from-[#1D1D22] to-[#070707]">
      <nav class=" border-gray-200 ">
        <div class="px-10 pr-20 flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/cvlytic/home" class="flex items-center">
            <img src={CVltyicLogo} class="h-6 mr-3" alt="Flowbite Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              CVlytic
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent  md:p-0 dark:text-white md:hover:text-blue-700"
                  aria-current="page"
                >
                  Know More
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                >
                  Connect
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
            </nav>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export { Analytics, Dashboard, Home };
