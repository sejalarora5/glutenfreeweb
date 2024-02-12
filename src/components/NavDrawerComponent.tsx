import { useMemo } from "react";
import { Link } from "react-router-dom";
import AppLogo from "../../src/assets/appIcon.png";
import RecipesIcon from "../../src/assets/icons_svg/ic_receipe_more_black.svg";
import HomeIcon from "../../src/assets/icons_svg/bottomTab/menu_home_selector-1.svg";
import BlogsIcon from "../../src/assets/icons_svg/ic_blogs.svg";
import VideosIcon from "../../src/assets/icons_svg/ic_videos.svg";
import GlutenFreeBookIcon from "../../src/assets/icons_svg/ic_e_book.svg";
import SettingIcon from "../../src/assets/icons_svg/ic_settings.svg";
import AboutMeIcon from "../../src/assets/icons_svg/ic_terms.svg";
import RtiIcon from "../../src/assets/icons_svg/ic_about_me.svg";
import FaqIcon from "../../src/assets/icons_svg/ic_faq.svg";
import ChangePasswordIcon from "../../src/assets/icons_svg/ic_password.svg";
import LogoutIcon from "../../src/assets/icons_svg/ic_logout.svg";
import DeleteIcon from "../../src/assets/icons_svg/ic_profile_unselected.svg";
const NavDrawerComponent = () => {
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

  return (
    <>
      {LinkArray.map((it) => {
        return (
          <li key={it.link} className="flex-row">
            <img className="sm:ml-10 " src={it.icon} height={50} width={50} />
            <Link className="text-md pl-0" to={it.link}>
              {it.name}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default NavDrawerComponent;
