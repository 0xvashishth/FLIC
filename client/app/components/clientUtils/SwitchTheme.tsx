"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiMoon, FiSun } from "react-icons/fi";

const SwitchTheme = () => {
  const router = useRouter();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("flicTheme") || "light";
      setTheme(storedTheme);

      const body = document.documentElement;
      body.setAttribute("data-theme", storedTheme);
    }
  }, [theme]); // Empty dependency array ensures this effect runs once on mount

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("flicTheme", newTheme);
    setTheme(newTheme);
    router.refresh();
  };

  return (
    <div
      className="fixed z-50 bottom-10 right-8 flex justify-center items-center btn"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <FiMoon className="w-5 h-5" />
      ) : (
        <FiSun className="w-5 h-5" />
      )}
    </div>
  );
};

export default SwitchTheme;