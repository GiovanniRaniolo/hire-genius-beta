import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/router";

// COMPONENTS
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import Loading from "@/components/Atoms/Loading/Loading";

// STYLE
import style from "../Form.module.scss";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);
      await login(email, password);
      setIsLoading(false);
      router.push("./landing-page");
    } catch (error) {
      setIsLoading(false);
      setError("Le credenziali inserite non sono corrette.");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <form className={style.form} onSubmit={handleLogin}>
      {error && <mark className={style.invalid}>{error}</mark>}
      <div className={style.inputs}>
        <InputBox type="email" name="userEmail" label="Email" value={email} placeholder="Inserisci la tua e-mail" onChange={(e) => setEmail(e.target.value)} required={true} />

        <InputBox
          type="password"
          name="userPassword"
          label="Password"
          minLength={6}
          value={password}
          placeholder="Inserisci la tua password"
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
      </div>

      <p className={style.forgotPassword}>
        <Link href="/forgot-password">Hai dimenticato la password?</Link>
      </p>

      <CtaButton
        label="Accedi"
        className="ctaA"
        type="submit"
        disabled={!isEmailValid(email) || !isPasswordValid(password)} // Disabilita il bottone se l'email o la password non sono validi
      />
      <div className={style.divider}>
        <span>oppure</span>
      </div>
    </form>
  );
};

export default LoginForm;
