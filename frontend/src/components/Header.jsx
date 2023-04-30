import { Link } from "react-router-dom";
import headerImg from "../assets/image.png";

export default function Header() {
  return (
    <header className=" header-light  bg-black h-14 sm:h-24 w-full md:h-40 ">
      <img
        className="right-0 top-0.5 opacity-50  h-5/6  "
        src={headerImg}
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
