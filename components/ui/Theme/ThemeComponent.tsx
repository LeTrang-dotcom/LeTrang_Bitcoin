"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function ThemeComponent() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, [theme]);

  function toggleTheme() {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "light");
    }
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className="flex flex-row gap-2 items-center">
      <button
        type="button"
        className="p-2 rounded-full"
        onClick={toggleTheme}
        style={{ cursor: "pointer" }}
      >
        {theme === "light" ? (
          <FontAwesomeIcon icon={faSun} style={{ color: "#1a1a1a" }} />
        ) : (
          <FontAwesomeIcon icon={faMoon} style={{ color: "#ffffff" }} />
        )}
      </button>
    </div>
  );
}
