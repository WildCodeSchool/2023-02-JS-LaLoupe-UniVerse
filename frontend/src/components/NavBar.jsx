const NavBar = () => {
  return (
    <div className="absolute bottom-0 w-screen shadow-2xl md:hidden fixed">
      <nav className="bg-zinc-900/50 p-5 flex align-item justify-around">
        <img
          src="../src/assets/headphone_2_line.svg"
          alt="headphones logo"
          className="w-10 h-10 "
        />

        <img
          src="../src/assets/search_2_line.svg"
          alt="Loupe logo"
          className="w-10 h-10"
        />
        <img
          src="../src/assets/radio_line.svg"
          alt="Radio logo"
          className="w-10 h-10"
        />
      </nav>
    </div>
  );
};

export default NavBar;
