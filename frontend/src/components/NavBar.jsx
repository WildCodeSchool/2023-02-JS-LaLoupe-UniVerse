import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="fixed bottom-0 w-screen shadow-2xl md:hidden ">
      <nav className="bg-zinc-900/90 p-3 flex align-item justify-around">
        <NavLink to="/">
          <img
            src="../src/assets/headphone_2_line.svg"
            alt="headphones logo"
            className="w-10 h-10 opacity-70 "
          />
        </NavLink>
        <NavLink to="/search">
          <img
            src="../src/assets/search_2_line.svg"
            alt="Loupe logo"
            className="w-10 h-10 opacity-70"
          />
        </NavLink>
        <img
          src="../src/assets/radio_line.svg"
          alt="Radio logo"
          className="w-10 h-10 opacity-70"
        />
      </nav>
    </div>
  );
};

export default NavBar;
