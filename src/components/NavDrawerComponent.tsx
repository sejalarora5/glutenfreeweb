import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RWebShare } from "react-web-share";
import RecipesIcon from "../../src/assets/icons_svg/ic_receipe_more_black.svg";
import HomeIcon from "../../src/assets/icons_svg/bottomTab/menu_home_selector-1.svg";
import BlogsIcon from "../../src/assets/icons_svg/ic_blogs.svg";
import VideosIcon from "../../src/assets/icons_svg/ic_videos.svg";
import GlutenFreeBookIcon from "../../src/assets/icons_svg/ic_e_book.svg";
import SettingIcon from "../../src/assets/icons_svg/ic_settings.svg";
import AboutMeIcon from "../../src/assets/icons_svg/ic_terms.svg";
import RtiIcon from "../../src/assets/icons_svg/ic_about_me.svg";
import FaqIcon from "../../src/assets/icons_svg/ic_faq.svg";
import ShareIcon from "../../src/assets/icons_svg/ic_share.svg";
import LogoutIcon from "../../src/assets/icons_svg/ic_logout.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { UserStateType, logOutUser } from "../redux/userSlice/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "./Modal";
const NavDrawerComponent = () => {
  const userSelector = useSelector<RootState>(
    (state) => state.userSlice
  ) as UserStateType;
  const dispatch = useDispatch();
  const [logoutModal, setLogoutModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const LinkArray: Array<{ name: string; link: string; icon: string }> =
    useMemo(() => {
      return [
        {
          name: "Home",
          link: "/",
          icon: HomeIcon,
        },
        {
          name: "Recipes",
          link: "/recipes",
          icon: RecipesIcon,
        },
        {
          name: "Blogs",
          link: "/blogs",
          icon: BlogsIcon,
        },
        {
          name: "Find Shops",
          link: "/stores",
          icon: RecipesIcon,
        },
        {
          name: "Videos",
          link: "/videos",
          icon: VideosIcon,
        },
        {
          name: "Gluten Free eBook",
          link: "/gluten_free_ebook",
          icon: GlutenFreeBookIcon,
        },
        {
          name: "Settings",
          link: "/settings",
          icon: SettingIcon,
        },
        {
          name: "About Me",
          link: "/aboutme",
          icon: AboutMeIcon,
        },
        {
          name: "Right to information",
          link: "/rti",
          icon: RtiIcon,
        },
        {
          name: "FAQ to information",
          link: "/faq",
          icon: FaqIcon,
        },
      ];
    }, []);
  const navigate = useNavigate();

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
      {LinkArray.map((it) => {
        return (
          <div
            key={it.link}
            className="flex pl-2 flex-row hover:bg-primary h-2 min-h-8 focus:outline-none active:bg-primary focus:bg-primary"
          >
            <img
              className="ml-2 hover:bg-transparent focus:outline-none active:bg-primary focus:bg-transparent"
              src={it.icon}
              height={20}
              width={20}
            />
            <Link
              className="text-md pl-2 hover:bg-transparent self-center active:bg-primary focus:bg-transparent"
              to={it.link}
            >
              {it.name}
            </Link>
          </div>
        );
      })}
      <button
        className="btn flex-row justify-start h-2 min-h-8 rounded-none hover:bg-primary "
        onClick={() => {}}
      >
        <img className="ml-0" src={ShareIcon} height={20} width={20} />
        <RWebShare
          data={{
            text: "Gluten Free Jio",
            url: "http://localhost:5173",
            title: "Gluten Free Jio",
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <button className="text text-sm font-normal pl-0 rounded-none">
            Share
          </button>
        </RWebShare>
      </button>
      {userSelector.token !== "" && (
        <>
          <button
            className="btn flex-row justify-start h-2 min-h-8 rounded-none hover:bg-primary "
            onClick={() => {
              setLogoutModal(true);
            }}
          >
            <img className="ml-0" src={LogoutIcon} height={20} width={20} />
            <h2 className="text-md pl-0 hover:bg-transparent font-normal self-center active:bg-primary focus:bg-transparent">
              Logout
            </h2>
          </button>
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
        </>
      )}
      {userSelector.token !== "" && (
        <>
          <button
            className="btn flex-row justify-start h-2 min-h-8 rounded-none hover:bg-primary "
            onClick={() => {
              setDeleteAccountModal(true);
            }}
          >
            <img className="ml-0" src={LogoutIcon} height={20} width={20} />
            <h2 className="text-md pl-0 hover:bg-transparent font-normal self-center active:bg-primary focus:bg-transparent">
              Delete Account
            </h2>
          </button>
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
        </>
      )}
    </>
  );
};

export default NavDrawerComponent;
