import { useState } from "react";
import { auth, db } from "../../../lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { FirebaseError } from "firebase/app";

// STYLE
import style from "../Form.module.scss";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";

const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Validazione email
  const isEmailValid = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Validazione password
  const isPasswordValid = (password: string) => {
    return password.length >= 6; // Controlla che la password sia lunga almeno 6 caratteri
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userName) {
      setError("Il campo Username è obbligatorio.");
      return;
    }

    if (!isEmailValid(email)) {
      setError("Inserisci un'email valida.");
      return;
    }

    if (!isPasswordValid(password)) {
      setError("La password deve essere di almeno 6 caratteri.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Utente registrato con successo:", user);

      // Salva l'utente su Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        userName: userName,
      });

      router.push("/landing-page"); // Reindirizza
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        console.error("Errore durante la registrazione:", err.message);
        setError(err.message || "Errore durante la registrazione. Riprova.");
      } else {
        setError("Errore sconosciuto durante la registrazione.");
      }
    }
  };

  return (
    <form className={style.form} onSubmit={handleRegister}>
      <InputBox
        type="text"
        name="userName"
        label="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required={true}
        placeholder="Inserisci il tuo nome utente"
        minLength={3}
      />

      <InputBox type="email" name="userEmail" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required={true} placeholder="Inserisci la tua email" />

      <InputBox
        type="password"
        name="userPassword"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={true}
        placeholder="Scegli una password di almeno 6 caratteri"
        minLength={6}
      />

      {error && <mark className={style.invalid}>{error}</mark>}

      <CtaButton label="Registrati" className="ctaA" type="submit" disabled={!isEmailValid(email) || !isPasswordValid(password)} />
      <p className={style.privacyInfo}>*I tuoi dati saranno protetti secondo GDPR e usati soltanto per personalizzare la tua esperienza.</p>
    </form>
  );
};

export default RegisterForm;
