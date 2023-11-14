import { ReactComponent as Sun } from "../../components/DarkMode/Sun.svg";
import { ReactComponent as Moon } from "../../components/DarkMode/Moon.svg";
import React, { useEffect, useState } from "react";
import "./dark_mode.css";

function DarkMode() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
}

export default DarkMode;
