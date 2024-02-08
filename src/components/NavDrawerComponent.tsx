import { useMemo } from "react";
import { Link } from "react-router-dom";

const NavDrawerComponent = () => {
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
      {LinkArray.map((it) => {
        return (
          <li key={it.link}>
            <Link className="text-lg" to={it.link}>
              {it.name}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default NavDrawerComponent;
