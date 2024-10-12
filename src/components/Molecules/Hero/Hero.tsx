import style from "./Hero.module.scss";
import { heroLabels } from "@/constants/indexLabels";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import heroImg from "/public/favicon.svg";

import Image from "next/image";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();

  const handleButton = () => {
    router.push("/#features");
  };

  return (
    <section className={style.hero}>
      <div className={style.heroContainer}>
        <div className={style.heroContent}>
          <h1>HireGenius</h1>
          <h2>
            La tua arma segreta
            <br />
            per Test di
            <span className={style.wrappedText1}> competenza</span>
            <br />e Colloqui <span className={style.wrappedText2}> di successo </span>
          </h2>
          <p>{heroLabels.subtitle}</p>

          <CtaButton onClick={handleButton} className="ctaA" label="Scopri di più" />
        </div>

        <Image className={style.heroImg} src={heroImg} alt="Hero" width={400} height={400} priority={true} />
      </div>
    </section>
  );
};

export default Hero;
