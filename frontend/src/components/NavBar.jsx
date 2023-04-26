import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className=" fixed bottom-0 w-screen shadow-2xl md:hidden ">
      <nav className="bg-zinc-900/90 p-2 flex align-item justify-around">
        <NavLink
          to="/"
          // className=" focus:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  transition duration-300 ease-in-out rounded-md"
          end
        >
          {({ isActive }) => (
            <div
              className={
                isActive
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md"
                  : ""
              }
            >
              <img
                src="../src/assets/headphone_2_line.svg"
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
                src="../src/assets/search_2_line.svg"
                alt="Loupe logo"
                className="w-10 h-10 opacity-70"
              />
            </div>
          )}
        </NavLink>
        <NavLink to="/searchrtbgd">
          {({ isActive }) => (
            <div
              className={
                isActive
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md "
                  : ""
              }
            >
              <img
                src="../src/assets/radio_line.svg"
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
