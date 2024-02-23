import { useMemo } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserStateType } from "../redux/userSlice/userSlice";
type props = {
  openLogoutModal: () => void;
  openDeleteAccountModal: () => void;
};
const NavDrawerComponent = ({
  openLogoutModal,
  openDeleteAccountModal,
}: props) => {
  const userSelector = useSelector<RootState>(
    (state) => state.userSlice
  ) as UserStateType;
  const navigate = useNavigate();
  const LinkArray: Array<{
    name: string;
    link: string;
    icon: string;
  }> = useMemo(() => {
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
        link: "/shops",
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
            onClick={openLogoutModal}
          >
            <img className="ml-0" src={LogoutIcon} height={20} width={20} />
            <h2 className="text-md pl-0 hover:bg-transparent font-normal self-center active:bg-primary focus:bg-transparent">
              Logout
            </h2>
          </button>
        </>
      )}
      {userSelector.token !== "" && (
        <>
          <button
            className="btn flex-row justify-start h-2 min-h-8 rounded-none hover:bg-primary "
            onClick={() => {
              navigate("/changepassword");
            }}
          >
            <img className="ml-0" src={LogoutIcon} height={20} width={20} />
            <h2 className="text-md pl-0 hover:bg-transparent font-normal self-center active:bg-primary focus:bg-transparent">
              Change Password
            </h2>
          </button>
        </>
      )}
      {userSelector.token !== "" && (
        <>
          <button
            className="btn flex-row justify-start h-2 min-h-8 rounded-none hover:bg-primary "
            onClick={openDeleteAccountModal}
          >
            <img className="ml-0" src={LogoutIcon} height={20} width={20} />
            <h2 className="text-md pl-0 hover:bg-transparent font-normal self-center active:bg-primary focus:bg-transparent">
              Delete Account
            </h2>
          </button>
        </>
      )}
    </>
  );
};

export default NavDrawerComponent;
