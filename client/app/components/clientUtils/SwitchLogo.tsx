"use client"
import React, { useEffect, useState } from 'react';
import logoLight from "../../assets/logos/flic-transperent-white.png";
import logoDark from "../../assets/logos/flic-transperent.png";


const SwitchLogo = () => {

const [themeLogo, setThemeLogo] = useState(logoDark.src);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("flicTheme") || "light";
      setThemeLogo(storedTheme== "light" ? logoDark.src : logoLight.src);
    }
  });

  return (
    <img alt="flic logo" src={themeLogo} />
  );
};

export default SwitchLogo;
