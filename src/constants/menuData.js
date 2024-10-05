import HomeIcon from "@/../public/icons/home.svg";
import TopicIcon from "@/../public/icons/topic.svg";
import InterviewIcon from "@/../public/icons/interview.svg";
import LogoutIcon from "@/../public/icons/logout.svg";
import LoginIcon from "@/../public/icons/login.svg";
// Icons from: https://www.svgrepo.com/collection/wave-oval-interface-icons/

export const navMenu = [
  {
    icon: HomeIcon,
    label: "Home",
    link: "/storic-profile",
  },
  {
    icon: TopicIcon,
    label: "Nuovo argomento",
    link: "/topic-process",
  },
  {
    icon: InterviewIcon,
    label: "Nuovo colloquio",
    link: "/interview-process",
  },

  {
    icon: LogoutIcon,
    label: "Logout",
    link: "/logout",
  },
  {
    icon: LoginIcon,
    label: "Login",
    link: "/login",
  },
];

export const footerMenu = [
  {
    label: "Il progetto",
    link: "/",
  },
  {
    label: "Chi siamo",
    link: "/#chi-siamo",
  },
  {
    label: "Github",
    link: "https://github.com/GiovanniRaniolo/hire-genius-beta",
  },
];

export const loginLabels = {
  appName: "HireGenius",
  tagline: "Testa le tue competenze",
  emailLabel: "Email",
  passwordLabel: "Password",
  forgotPasswordLink: "Hai dimenticato la password?",
  buttonLogin: "Accedi",
  loginWithGoogle: "Accedi con Google",
  text: "Non hai un account?",
  action: "Registrati",
};

export const registrationFormLabels = {
  usernameLabel: "Username",
  roleLabel: "Role",
  seniorityLabel: "Seniority",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm password",
  buttonsRegister: "Registrati",
  privacyNote: "I tuoi dati saranno protetti secondo GDPR e usati soltanto per personalizzare la tua esperienza.",
};

export const recoveryPasswordLabels = {
  title: "Recupero Password",
  placeholder: "Inserisci la tua email",
  buttonRecovery: "Recupera Password",
  messagesSuccess: "La tua richiesta è stata inviata con successo. Controlla la tua email per ulteriori istruzioni.",
  messagesError: "Si è verificato un errore durante il recupero della password. Per favore, riprova.",
  linkText: "Torna al",
  loginLabel: "Login",
  href: "/login",
};

export const interviewFormLabels = {
  title: "Nuovo Colloquio",
  interviewLabel: "Posizione",
  interviewPlaceholder: "Inserisci il ruolo per cui ti candidi",
  seniority: "Livello di esperienza",
  numberOfQuestionsLabel: "Numero di domande",
  button: "Avanti",
};

export const interviewFormOptions = {
  optionsSeniority: [
    {
      label: "Junior",
      value: "Junior",
    },
    {
      label: "Mid-Level",
      value: "Mid-Level",
    },
    {
      label: "Senior",
      value: "Senior",
    },
  ],
  optionsQuestion: [
    {
      label: "5 domande",
      value: "5 domande",
    },
    {
      label: "10 domande",
      value: "10 domande",
    },
    {
      label: "15 domande",
      value: "15 domande",
    },
  ],
};

export const customFormLabels = {
  title: "Nuovo Argomento",
  topicLabel: "Argomento",
  topicPlaceholder: "Inserisci il tema del nuovo Test",
  level: "Livello",
  numberOfQuestionsLabel: "Numero di domande",
  testDurationLabel: "Durata del test",
  button: "Avanti",
};

export const customFormOptions = {
  optionsLevel: [
    {
      label: "Base",
      value: "Base",
    },
    {
      label: "Intermedio",
      value: "Intermedio",
    },
    {
      label: "Avanzato",
      value: "Avanzato",
    },
  ],
  optionsQuestion: [
    {
      label: "5 domande",
      value: "5 domande",
    },
    {
      label: "10 domande",
      value: "10 domande",
    },
    {
      label: "15 domande",
      value: "15 domande",
    },
  ],
};
