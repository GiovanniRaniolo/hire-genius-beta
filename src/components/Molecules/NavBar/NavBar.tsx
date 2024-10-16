import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "./NavBar.module.scss";
import { sidebarMenu, navMenu, footerMenu } from "@/constants/menuData";
import ActionButton from "@/components/Atoms/Buttons/ActionButton";
import MenuIcon from "/public/icons/menu-icon.png";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const router = useRouter();

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const menuElement = document.getElementById("sidebar-menu");
    if (menuElement && !menuElement.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredSidebarMenu = user ? sidebarMenu.filter((item) => item.label !== "Login") : navMenu.filter((item) => item.label === "Login" || item.label === "HireGenius");
  const filteredNavMenu = user ? navMenu.filter((item) => item.label !== "Login") : navMenu.filter((item) => item.label === "Login");

  return (
    <div className={style.navContainer} onMouseLeave={() => setIsOpen(false)}>
      {!isOpen && <ActionButton onClick={toggleMenu} className="round" icon={MenuIcon} />}

      {isOpen && (
        <>
          {/* Overlay */}
          <div className={style.overlay} onClick={() => setIsOpen(false)}></div>
          <nav id="sidebar-menu" className={style.sidebar}>
            <ul className={style.menuList}>
              {filteredSidebarMenu.map((item) => (
                <li key={item.label}>
                  <Link href={item.link} className={`${style.menuItem} ${router.pathname === item.link ? style.active : ""}`} onClick={() => setIsOpen(false)}>
                    <Image src={item.icon} alt={`${item.label} icon`} width={20} height={20} priority={false} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className={style.footerList}>
              {footerMenu.map((item) => (
                <li key={item.label}>
                  <Link href={item.link} onClick={() => setIsOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <Link href="/">
                <p>@2024 HireGenius</p>
              </Link>
            </ul>
          </nav>
        </>
      )}

      <nav className={style.navbar}>
        <Link href="/">
          <h4>HireGenius</h4>
        </Link>
        <ul className={style.menuList}>
          {filteredNavMenu.map((item) => (
            <li key={item.label}>
              <Link href={item.link} className={`${style.menuItem} ${router.pathname === item.link ? style.active : ""}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
