import { useState, useEffect } from "react";
import withAuth from "@/middleware/withAuth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import style from "@/pages/storic-profile/storic-profile.module.scss";
import Image from "next/image";
import QuizCard from "@/components/Molecules/QuizCard/QuizCard";
import userAvatar from "@/../public/icons/avatar-user.png";
import Loading from "@/components/Atoms/Loading/Loading";
import { InterviewSession } from "@/interfaces/interfaces";
import ResultsList from "@/components/Organism/ResultsList/ResultsList";
import Link from "next/link";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import React from "react";
import AddIcon from "@/../public/icons/add.svg";

const UserProfile = () => {
  const { user } = useAuth();
  const [interviewSessions, setInterviewSessions] = useState<InterviewSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInterviewSession, setSelectedInterviewSession] = useState<InterviewSession | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.interviewSessions) {
            const sortedInterviewSessions = userData.interviewSessions.sort(
              (a: InterviewSession, b: InterviewSession) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime()
            );
            setInterviewSessions(sortedInterviewSessions);
          } else {
            console.log("Nessuna sessione di intervista trovata.");
          }
        }
      } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteSession = (sessionId: string) => {
    // Filtra la sessione eliminata
    const updatedSessions = interviewSessions.filter((session) => session.sessionId !== sessionId);
    setInterviewSessions(updatedSessions);
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  if (user)
    return (
      <main className={style.main}>
        <div className={style.container}>
          {!selectedInterviewSession ? (
            <>
              <header className={style.header}>
                <div className={style.userInfo}>
                  <div className={style.NameAndMail}>
                    <h4>
                      <span>{user.displayName}</span>
                    </h4>
                    <h4>
                      <span>{user.email}</span>
                    </h4>
                  </div>
                  <Image src={userAvatar} alt="Profile avatar" width={40} height={40} />
                </div>
              </header>

              <p>
                Simula un <span>colloquio</span> di lavoro o cimentati con un approccio mirato selezionando un nuovo <span>argomento</span>. <br />
              </p>
              <div className={style.headerButtons}>
                <Link href="./topic-process">
                  <button>
                    <Image src={AddIcon} className={style.icon} alt="Time Icon" width={20} height={20} />
                    Argomento
                  </button>
                </Link>
                <Link href="./interview-process">
                  <button>
                    <Image src={AddIcon} className={style.icon} alt="Time Icon" width={20} height={20} />
                    Colloquio
                  </button>
                </Link>
              </div>

              {/*Lista Card */}
              <section>
                <h5 className={style.recentTests}>
                  Test Recenti
                  <span>{interviewSessions.length}</span>
                </h5>
                <ul className={style.cardsList}>
                  {interviewSessions.map((interviewSession, index) => (
                    <li key={index}>
                      <QuizCard interviewSession={interviewSession} onDelete={handleDeleteSession} setSelectedInterviewSession={setSelectedInterviewSession} />
                    </li>
                  ))}
                </ul>
              </section>
            </>
          ) : (
            <>
              <ResultsList evaluationResult={selectedInterviewSession.evaluationResult} interviewDetails={selectedInterviewSession.interviewDetails} />
            </>
          )}
          {selectedInterviewSession ? (
            <Link href={"/storic-profile"} className={style.linkBtn}>
              <CtaButton label="Torna al profilo" className="ctaC" onClick={() => setSelectedInterviewSession(null)} />
            </Link>
          ) : null}
        </div>
      </main>
    );
};

export default withAuth(UserProfile);
