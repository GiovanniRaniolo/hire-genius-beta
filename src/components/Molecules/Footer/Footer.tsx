import { useEffect, useState } from "react";
import { footerLabels } from "@/constants/indexLabels";
import { footerMenu } from "@/constants/menuData"; //add navMenu if you want filter with AuthContext
import style from "./Footer.module.scss";
import Link from "next/link";
// import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import logo from "@/../public/favicon.svg";

const Footer = () => {
  // const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  // const filteredNavMenu = user ? navMenu.filter((item) => item.label !== "Login") : navMenu.filter((item) => item.label === "Login");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
        setIsVisible(true); // Mostra il footer quando l'utente è vicino alla fine della pagina
      } else {
        setIsVisible(false); // Nascondi il footer quando l'utente scorre verso l'alto
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY > window.innerHeight - 100) {
        setIsVisible(true); // Mostra il footer quando il mouse è vicino al fondo
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <footer className={`${style.footer} ${isVisible ? style.visible : ""}`}>
      <div className={style.footerContainer}>
        <div className={style.footerHeader}>
          <Image src={logo} alt="Logo img" width={60} height={60} priority={false} />
          <div className={style.footerText}>
            <Link key={footerLabels.title} href="/">
              <h4>{footerLabels.title}</h4>
              <p>{footerLabels.subtitle}</p>
            </Link>
          </div>
        </div>
        <nav className={style.footerMenu}>
          {footerMenu.map((item) => (
            <Link key={item.label} href={item.link}>
              <Image src={item.icon} alt={`${item.label} icon`} width={20} height={20} priority={false} />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
