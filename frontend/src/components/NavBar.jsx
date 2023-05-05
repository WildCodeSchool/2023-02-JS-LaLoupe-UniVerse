// NavBar version mobile et tablette

import { NavLink } from "react-router-dom";
import headphone from "../assets/headphone_2_line.svg";
import search from "../assets/search_2_line.svg";
import radio from "../assets/radio_line.svg";

const NavBar = () => {
  return (
    <div className=" fixed bottom-0 w-screen shadow-2xl md:hidden ">
      <nav className="bg-zinc-900/90 p-2 flex align-item justify-around">
        <NavLink to="/" end>
          {({ isActive }) => (
            <div
              className={
                isActive
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md"
                  : ""
              }
            >
              <img
                src={headphone}
                alt="headphones logo"
                className="w-10 h-10 opacity-70 "
              />
            </div>
          )}
        </NavLink>

        <NavLink to="/search">
          {({ isActive }) => (
            <div
              className={
                isActive
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md "
                  : ""
              }
            >
              <img
                src={search}
                alt="Loupe logo"
                className="w-10 h-10 opacity-70"
              />
            </div>
          )}
        </NavLink>
        <NavLink to="/radio">
          {({ isActive }) => (
            <div
              className={
                isActive
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md "
                  : ""
              }
            >
              <img
                src={radio}
                alt="Radio logo"
                className="w-10 h-10 opacity-70"
              />
            </div>
          )}
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
