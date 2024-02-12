import { useMemo } from "react";
import { Link } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import NavDrawerComponent from "./NavDrawerComponent";
import AppLogo from "../assets/appIcon.png";
const Navbar = () => {
  const LinkArray: Array<{ name: string; link: string }> = useMemo(() => {
    return [
      {
        name: "Recipes",
        link: "/recipes",
      },
      {
        name: "Videos",
        link: "/videos",
      },
      {
        name: "Gluten Free eBook",
        link: "/gluten_free_ebook",
      },
      {
        name: "Settings",
        link: "/settings",
      },
      {
        name: "Our Story",
        link: "/our_story",
      },
      {
        name: "Right to information",
        link: "/rti",
      },
      {
        name: "FAQ to information",
        link: "/faq",
      },
    ];
  }, []);

  return (
    <>
      <header className="navbar bg-base-100">
        <div className="flex-1 justify-end items-end">
          <div className="flex-1">
            <img className="sm:ml-10 " src={AppLogo} height={100} width={100} />
          </div>
          <div className="flex justify-end self-center -mr-2 md:hidden">
            <div className="drawer drawer-end z-10">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer-4"
                  className="btn btn-square btn-ghost mr-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-10 h-10 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              {/* <div className="flex">
                    <img
                      className="sm:ml-10 "
                      src={AppLogo}
                      height={50}
                      width={50}
                    />
                  </div> */}
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>

                <ul className="menu p-0 w-80 min-h-full bg-base-200 text-base-content">
                  <div className="flex bg-[#D0E5E3] p-3">
                    <div className="flex">
                      <img
                        className="sm:ml-10 "
                        src={AppLogo}
                        height={60}
                        width={60}
                      />
                    </div>
                    <div className="flex self-center ml-5">
                      <Link
                        className="btn btn-secondary rounded-lg btn-sm shadow-lg shadow-[#FAA1D4] shadow-500/50 mr-5 text-white w-25 rounded-none"
                        to={"/login"}
                      >
                        Sign In
                      </Link>
                    </div>
                  </div>

                  <NavDrawerComponent />
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex-col hidden md:block">
            <div className="flex justify-end">
              <Link
                className="btn btn-secondary btn-sm rounded-md shadow-lg shadow-[#FAA1D4] shadow-500/50 mr-5 text-white w-25 rounded-none"
                to={"/login"}
              >
                Sign In
              </Link>
              <Link
                className="btn btn-secondary btn-sm rounded-md shadow-lg shadow-[#FAA1D4] shadow-500/50 mr-5 text-white w-25 rounded-none"
                to={"/signup"}
              >
                Sign Up
              </Link>
            </div>
            <div className="flex justify-end">
              <div className="flex-none ">
                <Link className="btn btn-ghost text-primary w-18" to={"/"}>
                  Home
                </Link>
              </div>
              <div className="flex-none ">
                <Link
                  className="btn btn-ghost text-primary w-22"
                  to={"/restaurants"}
                >
                  Find Shops
                </Link>
              </div>
              <div className="flex-none">
                <Link
                  className="btn btn-ghost text-primary w-18"
                  to={"/stores"}
                >
                  Cards
                </Link>
              </div>
              <div className="flex-none">
                <Link
                  className="btn btn-ghost text-primary w-18"
                  to={"/stores"}
                >
                  Blogs
                </Link>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost text-primary rounded-btn"
                >
                  More
                  <svg
                    className="w-4 h-4 text-primary-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18.4 10.3A2 2 0 0 0 17 7H7a2 2 0 0 0-1.5 3.3l4.9 5.9a2 2 0 0 0 3 0l5-6Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] p-2 shadow-lg shadow-gray shadow-500/50 bg-base-100 w-52 mt-4"
                >
                  <NavDropdown />
                </ul>
              </div>
              {/* <div className="flex-none">
                    <button
                      className="btn btn-ghost"
                      onClick={() => {
                        appDispatch(switchTheme());
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="w-6 h-6"
                      >
                        <path
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          className="fill-sky-400/20 stroke-sky-500"
                        ></path>
                        <path
                          d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                          className="stroke-sky-500"
                        ></path>
                      </svg>
                    </button>
                  </div> */}

              {/* <div className="flex-none">
                    {userSelector.token !== "" ? (
                      <div className="avatar placeholder mx-5">
                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                          <span className="text-xs">
                            {userSelector.userData.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <Link className="btn btn-primary w-24 m-5" to={"/login"}>
                        Login
                      </Link>
                    )}
                  </div> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
