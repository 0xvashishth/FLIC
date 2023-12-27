"use client";
import { usePathname } from "next/navigation";

export const MenuHorizontal = () => {
  const pathname = usePathname();

  return (
    <ul className="menu menu-horizontal px-1">
      <li>
        <a href="/" className={` ${pathname === "/" ? "active" : ""}`}>Home</a>
      </li>
      <li>
        <details>
          <summary>Services</summary>
          <ul className="p-2 z-50">
            <li>
              <a
                href="/form"
                className={` ${pathname === "/form" ? "active" : ""}`}
              >
                Form
              </a>
            </li>
            <li>
              <a
                href="/link"
                className={` ${pathname === "/link" ? "active" : ""}`}
              >
                Link
              </a>
            </li>
            <li>
              <a
                href="/chat"
                className={` ${pathname === "/chat" ? "active" : ""}`}
              >
                Chat <span className="badge bg-sys-yellow">New</span>
              </a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a
          href="/about"
          className={` ${pathname === "/about" ? "active" : ""}`}
        >
          Abous us
        </a>
      </li>
    </ul>
  );
};

export const MenuVertical = () => {
  const pathname = usePathname();

  return (
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li>
        <a className={` ${pathname === "/" ? "active" : ""}`} href="/">
          Home 🏠
        </a>
      </li>
      <li>
        <a>Services</a>
        <ul className="p-2">
          <li>
            <a
              className={` ${pathname === "/form" ? "active" : ""}`}
              href="/form"
            >
              Form
            </a>
          </li>
          <li>
            <a
              className={` ${pathname === "/link" ? "active" : ""}`}
              href="/link"
            >
              Link
            </a>
          </li>
          <li>
            <a
              className={` ${pathname === "/chat" ? "active" : ""}`}
              href="/chat"
            >
              Chat <span className="badge badge-primary">New</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a
          className={` ${pathname === "/about" ? "active" : ""}`}
          href="/about"
        >
          About us
        </a>
      </li>
    </ul>
  );
};
