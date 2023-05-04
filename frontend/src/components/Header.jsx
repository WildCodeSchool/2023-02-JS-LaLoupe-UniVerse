import { Link } from "react-router-dom";
import headerImg from "../assets/image.png";
import LightMode from "./LightMode";

export default function Header() {
  return (
    <main>
      <header className=" header-light top-0 bg-black h-14 sm:h-24 w-full md:h-40 ">
        <img
          className="right-0 top-0.5  opacity-50  h-5/6  "
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
      <div className=" left-1 top-12 absolute md:hidden">
        <LightMode />
      </div>
    </main>
  );
}
