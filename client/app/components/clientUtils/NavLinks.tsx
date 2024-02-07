"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MenuHorizontal = () => {
  const pathname = usePathname();

  return (
    <ul className="menu menu-horizontal px-1">
      <li>
        <Link href="/" className={` ${pathname === "/" ? "active" : ""}`}>Home</Link>
      </li>
      <li>
        <details>
          <summary>Services</summary>
          <ul className="p-2 z-50">
            <li>
              <Link
                href="/services/form"
                className={` ${pathname === "/services/form" ? "active" : ""}`}
              >
                Form
              </Link>
            </li>
            <li>
              <Link
                href="/services/link"
                className={` ${pathname === "/services/link" ? "active" : ""}`}
              >
                Link
              </Link>
            </li>
            <li>
              <Link
                href="/services/chat"
                className={` ${pathname === "/services/chat" ? "active" : ""}`}
              >
                Chat <span className="badge bg-sys-yellow">Soon</span>
              </Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link
          href="/about"
          className={` ${pathname === "/about" ? "active" : ""}`}
        >
          Abous us
        </Link>
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
        <Link className={` ${pathname === "/" ? "active" : ""}`} href="/">
          Home 🏠
        </Link>
      </li>
      <li>
        <a className={` ${pathname.includes("/services") ? "active" : ""}`}>Services</a>
        <ul className="p-2">
          <li>
            <Link
              className={` ${pathname === "/services/form" ? "active" : ""}`}
              href="/services/form"
            >
              Form
            </Link>
          </li>
          <li>
            <Link
              className={` ${pathname === "/services/link" ? "active" : ""}`}
              href="/services/link"
            >
              Link
            </Link>
          </li>
          <li>
            <Link
              className={` ${pathname === "/services/chat" ? "active" : ""}`}
              href="/services/chat"
            >
              Chat <span className="badge badge-primary">Soon</span>
            </Link>
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
