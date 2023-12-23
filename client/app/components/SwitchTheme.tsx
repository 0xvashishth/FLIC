"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiMoon, FiSun } from "react-icons/fi";
const SwitchTheme = () => {
  const router = useRouter();
  var [theme, setTheme] = useState("light");
  if (process.browser) {
    var [theme, setTheme] = useState(
      localStorage.getItem("flicTheme") || "light"
    );
  } else {
    var [theme, setTheme] = useState("light");
  }

  const toggleTheme = () => {
    localStorage.setItem(
      "flicTheme",
      localStorage.getItem("flicTheme") === "dark" ? "light" : "dark"
    );
    setTheme(theme === "dark" ? "light" : "dark");
    router.refresh();
  };

  //modify data-theme when theme changes
  useEffect(() => {
    console.log("Hello changed");
    var currentChangedTheme = localStorage.getItem("flicTheme") || "light";
    console.log(currentChangedTheme);
    const body = document.documentElement;
    body.setAttribute("data-theme", currentChangedTheme);
  }, [theme]);

  return (
    <button
      className="fixed z-50 bottom-10 right-8 flex justify-center items-center btn"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <FiMoon className="w-5 h-5" />
      ) : (
        <FiSun className="w-5 h-5" />
      )}
    </button>
  );
};

export default SwitchTheme;
