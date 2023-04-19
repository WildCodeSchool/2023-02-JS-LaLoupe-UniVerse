export default function Header() {
  return (
    <header className=" bg-black h-14 sm:h-24 md:h-40  ">
      <img
        className="right-0 top-0.5 opacity-40 h-full  "
        src="../src/assets/image.png"
        alt="wave"
      />
      <div className="degrade ">0</div>
      <h1 className="universe">
        uni<span>V</span>erse
      </h1>
    </header>
  );
}
