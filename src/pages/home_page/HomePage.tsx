import AppLogo from "../../assets/appIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { UserStateType } from "../../redux/userSlice/userSlice";
import { Link } from "react-router-dom";
import NavDrawerComponent from "../../components/NavDrawerComponent";
import HomeBanner from "../../assets/banner.jpg";
import { switchTheme } from "../../redux/themeSlice/themeSlice";
import { useEffect } from "react";
import {
  BlogsInitialStateType,
  fetchBlogs,
} from "../../redux/blogsSlice/blogsSlice";
import BlogsCard from "../../components/BlogsCard";
import NavDropdown from "../../components/NavDropdown";

const HomePage = () => {
  const userSelector = useSelector<RootState>(
    (state) => state.userSlice
  ) as UserStateType;

  const blogsSelector = useSelector<RootState>(
    (state) => state.blogsSlice
  ) as BlogsInitialStateType;

  const appDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    appDispatch(fetchBlogs());
  }, []);

  return (
    <div className="w-screen h-screen" data-theme="mytheme">
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

                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                  <div className="flex bg-[#D0E5E3]">
                    <div className="flex">
                      <img
                        className="sm:ml-10 "
                        src={AppLogo}
                        height={50}
                        width={50}
                      />
                    </div>
                    <div className="flex self-center">
                      <Link
                        className="btn btn-secondary btn-sm shadow-lg shadow-[#FAA1D4] shadow-500/50 mr-5 text-white w-25 rounded-none"
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
                className="btn btn-secondary btn-sm shadow-lg shadow-[#FAA1D4] shadow-500/50 mr-5 text-white w-25 rounded-none"
                to={"/login"}
              >
                Sign In
              </Link>
              <Link
                className="btn btn-secondary btn-sm shadow-lg shadow-[#FAA1D4] shadow-500/50 mr-5 text-white w-25 rounded-none"
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

      <main>
        <div className="flex items-center justify-center my-5">
          <img
            className="object-cover h-96 scale-110"
            src={HomeBanner}
            alt="app banner"
          />
        </div>
        <div>
          <h2 className="mt-14 mb-5 text-4xl text-pink-400 text-start mx-14">
            The Celiac Lifestyle
          </h2>

          <ul className="grid grid-cols-1  md:grid-cols-3 gap-3 place-items-center">
            {blogsSelector.data.success === true &&
              blogsSelector.data.data.rows
                .filter((it) => it.thumbnail !== "")
                .map((it) => (
                  <li key={it.id} className="my-2.5">
                    <BlogsCard
                      image={it.thumbnail}
                      title={it.title}
                      body={it.description.slice(3, -5)}
                      url={it.link}
                    />
                  </li>
                ))}
          </ul>
        </div>
      </main>

      <footer className="footer p-10 bg-base-200 text-base-content">
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <header className="footer-title">Newsletter</header>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>

        <nav>
          <header className="footer-title">Social</header>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;
