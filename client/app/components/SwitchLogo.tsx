"use client"
// import React, { useEffect, useState } from 'react';
import React from 'react';
// import { FiMoon, FiSun } from 'react-icons/fi';
import logoLight from "../assets/logos/flic-transperent-white.png";
import logoDark from "../assets/logos/flic-transperent.png";


const SwitchLogo = () => {
//   const [theme, setTheme] = useState(localStorage.getItem('flicTheme') || "light");
//   const toggleTheme = () => {
//     localStorage.setItem('flicTheme', localStorage.getItem('flicTheme') === 'dark' ? 'light' : 'dark')
//     setTheme(theme === 'dark' ? 'light' : 'dark');
//   };
var theme = logoDark.src;
if(typeof window !== 'undefined'){
  theme = localStorage.getItem('flicTheme') == "light" ? logoDark.src : logoLight.src
}

//   //modify data-theme when theme changes
//   useEffect(() => {
//     console.log("Hello logo");
//     var currentChangedTheme = localStorage.getItem('flicTheme') || "dark";
//     console.log(currentChangedTheme);
//     const body = document.documentElement;
//     body.setAttribute('data-theme', currentChangedTheme);
//   }, []);

  return (
    <img alt="flic logo" src={theme} />
  );
};

export default SwitchLogo;
