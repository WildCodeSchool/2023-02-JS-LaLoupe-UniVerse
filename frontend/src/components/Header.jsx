export default function Header() {
  return (
    <header className="bg-black h-10 sm:h-24 md:h-36">
      <img
        className=" right-0 top-0.5 opacity-50 h-full "
        src="../src/assets/image.png"
        alt="wave"
      />
      <p className="font-revalia text-2xl sm:text-5xl md:text-8xl  text-white absolute right-2 top-0 sm:top-5">
        uniVerse
      </p>
    </header>
  );
}
