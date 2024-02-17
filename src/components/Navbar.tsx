import { Link, useNavigate } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import NavDrawerComponent from "./NavDrawerComponent";
import AppLogo from "../assets/appIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { UserStateType, logOutUser } from "../redux/userSlice/userSlice";
import { RootState } from "../redux/store";
import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const userSelector = useSelector<RootState>(
    (state) => state.userSlice
  ) as UserStateType;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const handleDeleteAccount = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/delete-account`,
        {
          userId: userSelector.userData.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: userSelector.userData.token,
          },
        }
      );
      console.log("Successfully deleted");
      dispatch(logOutUser());
      navigate("/");
      toast.success("Account deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete account", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <>
      {logoutModal && (
        <Modal
          modal={logoutModal}
          handleModalClose={() => setLogoutModal(false)}
          handleModalFunctionality={() => {
            dispatch(logOutUser());
          }}
          title={"Are you sure you want to logout?"}
          subtitle1={"Logout"}
          subtitle2={"Cancel"}
        />
      )}
      {deleteAccountModal && (
        <Modal
          modal={deleteAccountModal}
          handleModalClose={() => setDeleteAccountModal(false)}
          handleModalFunctionality={() => {
            handleDeleteAccount();
          }}
          title={"Are you sure you want to delete the account?"}
          subtitle1={"Delete Account"}
          subtitle2={"Cancel"}
        />
      )}

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
                        className="img ml-1"
                        src={AppLogo}
                        height={60}
                        width={60}
                      />
                    </div>
                    <div className="flex self-center ml-5">
                      {userSelector.token !== "" ? (
                        <div>
                          <h3 className="text text-[#3F4953] font-medium p-1">
                            {userSelector.userData.name}
                          </h3>
                          <Link
                            className="btn btn-secondary rounded-lg btn-sm shadow-md shadow-[#FAA1D4] shadow-500/50 mr-5 text-white w-25"
                            to={"/profile"}
                          >
                            View Profile
                          </Link>
                        </div>
                      ) : (
                        <>
                          <Link
                            className="btn btn-secondary rounded-lg btn-sm shadow-md shadow-[#FAA1D4] shadow-500/50 mr-5 text-white w-25"
                            to={"/login"}
                          >
                            Sign In
                          </Link>
                        </>
                      )}
                    </div>
                  </div>

                  <NavDrawerComponent
                    openLogoutModal={() => {
                      setLogoutModal(true);
                    }}
                    openDeleteAccountModal={() => {
                      setDeleteAccountModal(true);
                    }}
                  />
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex-col hidden md:block">
            <div className="flex justify-end">
              {userSelector.token !== "" ? (
                <div className="flex py-2">
                  <button
                    onClick={() => navigate("/profile")}
                    className="btn btn-secondary btn-sm rounded-md shadow-lg shadow-[#FAA1D4] shadow-500/50 mr-5 text-white w-25"
                  >
                    Hi, {userSelector.userData.name.split(" ")[0]}!
                  </button>
                  <button
                    onClick={() => setModal(true)}
                    className="btn btn-sm bg-transparent hover:bg-secondary font-semibold hover:text-white py-2 px-4 border border-[#FAA1D4] hover:border-transparent rounded mr-4"
                  >
                    Logout
                  </button>
                  <dialog
                    open={modal}
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box w-11/12 max-w-5xl">
                      <h3 className="font-bold text-lg">
                        Hi {userSelector.userData.name}
                      </h3>
                      <p className="py-4">Are you sure you want to logout?</p>
                      <div className="modal-action">
                        <form method="dialog">
                          <button
                            className="btn mr-5 btn-secondary"
                            onClick={() => {
                              dispatch(logOutUser());
                            }}
                          >
                            Logout
                          </button>
                          <button
                            onClick={() => setModal(false)}
                            className="btn"
                          >
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              ) : (
                <div className="py-2">
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
              )}
            </div>
            <div className="flex justify-end pr-5">
              <div className="flex-none ">
                <Link className="btn btn-ghost text-primary w-18" to={"/"}>
                  Home
                </Link>
              </div>
              <div className="flex-none">
                <Link className="btn btn-ghost text-primary w-22" to={"/shops"}>
                  Find Shops
                </Link>
              </div>
              <div className="flex-none">
                <Link className="btn btn-ghost text-primary w-18" to={"/cards"}>
                  Cards
                </Link>
              </div>
              <div className="flex-none">
                <Link className="btn btn-ghost text-primary w-18" to={"/blogs"}>
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
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
