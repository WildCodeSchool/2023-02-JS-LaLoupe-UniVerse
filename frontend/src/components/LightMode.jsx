import React from "react";

export default function DarkMode() {
  const clickedClass = "clicked";
  const { body } = document;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(darkTheme);
    localStorage.setItem("theme", "dark");
  }

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.toggle(clickedClass);
      localStorage.setItem("theme", "dark");
      theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.toggle(clickedClass);
      localStorage.setItem("theme", "dark");
      theme = darkTheme;
    }
  };

  return (
    <div className="relative top-0  md:ml-10 ">
      <label className="switch ">
        <input
          className={theme === "dark" ? clickedClass : ""}
          onClick={(e) => switchTheme(e)}
          type="checkbox"
        />
        <span className="slider" />
      </label>
    </div>
  );
}
