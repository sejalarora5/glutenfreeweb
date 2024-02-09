import { useMemo } from "react";
import { Link } from "react-router-dom";
import AppLogo from "../../src/assets/appIcon.png";

const NavDrawerComponent = () => {
  const LinkArray: Array<{ name: string; link: string }> = useMemo(() => {
    return [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Recipes",
        link: "/recipes",
      },
      {
        name: "Blogs",
        link: "/blogs",
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
      {LinkArray.map((it) => {
        return (
          <li key={it.link} className="flex-row">
            <img className="sm:ml-10 " src={AppLogo} height={50} width={50} />
            <Link className="text-md text-primary" to={it.link}>
              {it.name}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default NavDrawerComponent;
