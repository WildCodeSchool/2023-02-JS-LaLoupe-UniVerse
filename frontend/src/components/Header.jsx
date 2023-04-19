export default function Header() {
  return (
    <header className="bg-black h-10 sm:h-24 md:h-36">
      <img
        className="right-0 top-0.5 opacity-50 h-full w-3/4 "
        src="../src/assets/image.png"
        alt="wave"
      />
      {/* <video
        src="../src/assets/equalizer.mp4"
        className=" relative"
        muted=""
        autoplay=""
      ></video> */}

      <p className="font-revalia text-2xl sm:text-5xl md:text-8xl  text-white absolute right-2 top-0 sm:top-5">
        <span className="text-purple-600 ">u</span>ni
        <span className="text-purple-600 ">V</span>er
        <span className="text-purple-600 ">s</span>e
      </p>
    </header>
  );
}
