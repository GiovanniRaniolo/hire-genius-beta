// src/pages/register.tsx

// COMPONENTS
import RegisterForm from "@/components/Organism/RegisterForm/RegisterForm";

// STYLE
import style from "../login/login.module.scss";
import Image from "next/image";
import LoginHeroLG from "@/../public/hero/hero.png";
import Link from "next/link";

const Register = () => {
  return (
    <section className={style.login}>
      <div className={style.loginContainer}>
        <Image className={style.heroImg} src={LoginHeroLG} alt="Hero image" width={444} height={585} priority={true} />

        <main className={style.main}>
          <header className={style.header}>
            <h2>
              Registrati | <span>Mettiti subito in gioco!</span>
            </h2>
          </header>

          <RegisterForm />
          {/* {error && <p>{error}</p>} */}

          <p className={style.register}>
            Hai già un account?{" "}
            <Link className={style.registerLink} href="/login">
              Accedi
            </Link>
          </p>
        </main>
      </div>
    </section>
  );
};

export default Register;
