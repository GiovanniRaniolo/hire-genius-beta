import { collection, query, where, getDocs } from "firebase/firestore"; // Importare le funzioni di Firestore
import style from "./forgotPassword.module.scss";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { FirebaseError } from "firebase/app";
import { forgotPasswordLabels } from "@/constants/forgotPasswordLabels";
import Input from "@/components/Atoms/Input/Input";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import { db } from "@/lib/firebaseConfig"; // Importare il database Firestore

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();

  const messageRef = useRef<HTMLDivElement>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // Query per verificare se l'email esiste nel database
      const usersCollection = collection(db, "users");
      const emailQuery = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(emailQuery);

      // Controlla se la query ha trovato un risultato
      if (querySnapshot.empty) {
        setError("L'email inserita non è registrata. Controlla e riprova.");
        return;
      }

      // Se l'email esiste, procedi con il reset della password
      await resetPassword(email);
      setMessage(forgotPasswordLabels.setMessage);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(forgotPasswordLabels.setError);
      } else {
        setError(forgotPasswordLabels.unknownError);
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    // Ignora il click se è sul link di login
    if ((event.target as HTMLElement).closest(`.${style.login}`)) {
      return; // Non eseguire il reset dei messaggi
    }

    if (messageRef.current && !messageRef.current.contains(event.target as Node)) {
      setMessage("");
      setError("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={style.main}>
      <div className={style.mainContent}>
        <h1>{forgotPasswordLabels.title}</h1>
        <form onSubmit={handleResetPassword} className={style.form}>
          <Input
            type="email"
            name="Email"
            label={forgotPasswordLabels.input}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required={false}
            placeholder="Inserisci la tua email"
          />
          <CtaButton label={forgotPasswordLabels.button} className="ctaA" type="submit" />
        </form>

        {(message || error) && (
          <div ref={messageRef} className={`${style.messageContainer} ${error ? style.errorContainer : style.successContainer}`}>
            {message && <p className={style.message}>{message}</p>}
            {error && <p className={style.error}>{error}</p>}
          </div>
        )}

        <p>
          Inserisci la mail che hai usato per la registrazione e premi "Invia" e controlla la tua casella di posta. <br />
          Troverai il link per reimpostare la password.
        </p>
        <p>
          <Link href="/login" className={style.login}>
            {forgotPasswordLabels.login}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
