import React from "react";
import {
  opun_black,
  opun_light,
  opun_medium,
} from "../assets/fonts/FontMaster";
import logo from "../assets/logos/flic-transperent-white.png";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
  <aside>
    <img className="w-40" src={logo.src} />
    <p className="my-3">All in one Form, Link and Chat solution<br/>Built With 💖 By <a href="https://github.com/0xvashishth">Vashishth Patel</a></p>
  </aside> 
  <nav>
    <header className="footer-title">Services</header> 
    <a className="link link-hover">Form 🚀</a>
    <a className="link link-hover">Link 🚀</a>
    <a className="link link-hover">Chat 🚀</a>
    <a className="link link-hover">🚀👨🏻‍🚀</a>
  </nav> 
  <nav>
    <header className="footer-title">Company</header> 
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">🚀👨🏻‍🚀</a>
  </nav> 
  <nav>
    <header className="footer-title">Legal</header> 
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
    <a className="link link-hover">🚀👨🏻‍🚀</a>
  </nav>
</footer>
  );
};

export default Footer;
