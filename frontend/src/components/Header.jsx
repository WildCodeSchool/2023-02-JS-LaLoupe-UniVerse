import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className=" bg-black h-14 sm:h-24 md:h-40  ">
      <img
        className="right-0 top-0.5 opacity-50 h-full 4 "
        src="../src/assets/image.png"
        alt="wave"
      />
      <div className="degrade">
        <p className="opaque1">0</p>
        <p className="opaque2">0</p>
      </div>
      <Link to="/">
        <p
          id="universe"
          className="text-2xl sm:text-5xl md:text-8xl  text-white absolute right-2 top-0 sm:top-5"
        >
          uni<span className="vuniverse">V</span>erse
        </p>
      </Link>
    </header>
  );
}
