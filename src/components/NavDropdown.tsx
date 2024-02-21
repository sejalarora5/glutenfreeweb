import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { UserStateType } from "../redux/userSlice/userSlice";
const NavDropdown = () => {
  const userSelector = useSelector<RootState>(
    (state) => state.userSlice
  ) as UserStateType;
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
        name: "About Us",
        link: "/aboutme",
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
            {it.link === "/recipes" && (
              <a
                className="text-md text-primary"
                href={`${import.meta.env.VITE_BASE_URL + "/api/recipes"}`}
              >
                {it.name}
              </a>
            )}
            {it.link !== "/recipes" && (
              <Link className="text-md text-primary" to={it.link}>
                {it.name}
              </Link>
            )}
          </li>
        );
      })}
    </>
  );
};

export default NavDropdown;
