import { NavLink } from "react-router-dom";
import LightMode from "./LightMode";
import headphone from "../assets/headphone_2_line.svg";
import search from "../assets/search_2_line.svg";
import radio from "../assets/radio_line.svg";

const NavBar = () => {
  return (
    <div className=" navBar hidden md:block fixed ">
      <nav className=" absolute inset-y-0 left-0 md:mt-40  text-white/70 space-y-5">
        <NavLink to="/" className="  ">
          {({ isActive }) => (
            <div
              className={
                isActive
                  ? "text-white"
                  : "hover:bg-gradient-to-r from-pink-500/80 via-purple-500 to-pink-500"
              }
            >
              <p className="flex flex-row-reverse text-xl justify-end px-10 py-3">
                Accueil
                <img
                  src={headphone}
                  alt="headphones logo"
                  className="logo w-8 h-8 mr-5 "
                />
              </p>
            </div>
          )}
        </NavLink>
        <NavLink to="/search">
          {({ isActive }) => (
            <div
              className={
                isActive
                  ? "text-white"
                  : "hover:bg-gradient-to-r from-pink-500/80 via-purple-500 to-pink-500 "
              }
            >
              <p className="flex flex-row-reverse text-xl justify-end px-10 py-3">
                Recherche
                <img
                  src={search}
                  alt="Loupe logo"
                  className="logo w-8 h-8 mr-5 "
                />
              </p>
            </div>
          )}
        </NavLink>
        <NavLink to="/radio">
          {({ isActive }) => (
            <div
              className={
                isActive
                  ? "text-white"
                  : "hover:bg-gradient-to-r from-pink-500/80 via-purple-500 to-pink-500 "
              }
            >
              <p className="flex flex-row-reverse text-xl justify-end px-10 py-3">
                Radio
                <img
                  src={radio}
                  alt="Radio logo"
                  className="logo w-8 h-8 mr-5 "
                />
              </p>
            </div>
          )}
        </NavLink>
        <LightMode />
      </nav>
    </div>
  );
};

export default NavBar;
