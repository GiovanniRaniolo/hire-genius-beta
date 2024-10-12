import style from "./HowTo.module.scss";
import Image from "next/image";
import Step1Image from "@/../public/how-to/step1.svg";
import Step2Image from "@/../public/how-to/step2.svg";
import Step3Image from "@/../public/how-to/step3.svg";
import Step4Image from "@/../public/how-to/step4.svg";
import Step5Image from "@/../public/how-to/step5.svg";
import Step6Image from "@/../public/how-to/step6.svg";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import Link from "next/link";

const steps = [
  {
    title: "Crea un Account",
    description: "Registrati su HireGenius per accedere gratuitamente a tutte le funzionalità e iniziare il tuo percorso di preparazione ai colloqui.",
    image: Step1Image,
  },
  {
    title: "Personalizza il Colloquio",
    description: "Scegli l'argomento e il livello di difficoltà. Configura la sessione in base ai requisiti della posizione che stai cercando.",
    image: Step2Image,
  },
  {
    title: "Scegli l'Intervistatore",
    description: "Scegli tra sei profili di intervistatori AI, ognuno con uno stile unico, per prepararti a una varietà di situazioni di colloquio.",
    image: Step3Image,
  },
  {
    title: "Simula il Colloquio",
    description: "Affronta un colloquio simulato con domande realistiche e sfide pertinenti, generate in base alle tue impostazioni personalizzate.",
    image: Step4Image,
  },
  {
    title: "Feedback Immediato",
    description: "Ottieni valutazioni istantanee e feedback dettagliati su ogni risposta, identificando le aree di miglioramento.",
    image: Step5Image,
  },
  {
    title: "Analizza e Cresci",
    description: "Rivedi i risultati nel tuo profilo, analizza i tuoi progressi e continua a perfezionare le tue competenze con suggerimenti mirati.",
    image: Step6Image,
  },
];

const HowTo = () => {
  return (
    <section id="how-to" className={style.howToSection}>
      <div className={style.howToContainer}>
        <div className={style.howToHeader}>
          <h2>Come Funziona</h2>
        </div>

        <div className={style.howToRow}>
          {steps.map((step, index) => (
            <div key={index} className={style.stepCard}>
              <div className={style.stepImg}>
                <Image src={step.image} alt={`Step ${index + 1}`} width={100} height={100} priority={true} />
              </div>
              <div className={style.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Link href={"/login"}>
          <CtaButton className="ctaB" label="Cominciamo!" />
        </Link>
      </div>
    </section>
  );
};

export default HowTo;
