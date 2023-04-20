import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="hidden md:block w-screen fixed">
      <nav className=" absolute inset-y-0 left-0 md:mt-36  text-white/70 space-y-5">
        <NavLink to="/" className="  ">
          <div className=" hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  transition duration-300 ease-in-out hover:opacity-70">
            <p className="flex flex-row-reverse text-xl justify-end px-10 py-3">
              Accueil
              <img
                src="../src/assets/headphone_2_line.svg"
                alt="headphones logo"
                className="w-8 h-8 mr-5 "
              />
            </p>
          </div>
        </NavLink>
        <NavLink to="/search">
          <div className=" hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  transition duration-300 ease-in-out hover:opacity-70">
            <p className="flex flex-row-reverse text-xl justify-end px-10 py-3">
              Recherche
              <img
                src="../src/assets/search_2_line.svg"
                alt="Loupe logo"
                className="w-8 h-8 mr-5 "
              />
            </p>
          </div>
        </NavLink>
        <div className=" hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  transition duration-300 ease-in-out hover:opacity-70">
          <p className="flex flex-row-reverse text-xl justify-end px-10 py-3">
            Radio
            <img
              src="../src/assets/radio_line.svg"
              alt="Radio logo"
              className="w-8 h-8 mr-5 "
            />
          </p>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
