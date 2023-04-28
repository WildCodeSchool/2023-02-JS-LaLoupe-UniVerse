import lune from "../assets/LightMode/lune.png";
import soleil from "../assets/LightMode/soleil.png";

export default function LigthMode() {
  // const setLightMode = () => {
  //   document.querySelector("body").setAttribute("data-theme", "light");
  // };

  // const setDarkMode = () => {
  //   document.querySelector("body").setAttribute("data-theme", "dark");
  // };
  // const toggleTheme = (e) => {
  //   if (e.target.checked) setLightMode();
  //   else setDarkMode();
  // };

  const moonIcon = document.querySelector(".moon");
  const sunIcon = document.querySelector(".sun");

  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;

  const iconToggle = () => {
    moonIcon.classList.toogle("display-none");
    sunIcon.classList.toggle("display-none");
  };

  const themeCheck = () => {
    if (userTheme === "light" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add("light");
      sunIcon.classList.add("display-none");
      return;
    }
    moonIcon.classList.add("display-none");
  };

  const themeSwitch = () => {
    if (document.documentElement.classList.contains("light")) {
      document.documentElement.classList.remove("light");
      iconToggle();
      return;
    }
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");
    iconToggle();
  };

  moonIcon.addEventListener("click", () => {
    themeSwitch();
  });

  sunIcon.addEventListener("click", () => {
    themeCheck();
  });

  return (
    // <div className="invisible md:visible ml-8">
    //   <form className="toggle-switch ">
    //     <label className="switch-label">
    //       <input className="checkbox" onChange={toggleTheme} type="checkbox" />
    //       <span className="slider"></span>
    //     </label>
    //   </form>
    // </div>
    <figure className="  w-10">
      <img className="sun" src={soleil} alt="soleil" />
      <img className="moon" src={lune} alt="lune" />
    </figure>
  );
}
