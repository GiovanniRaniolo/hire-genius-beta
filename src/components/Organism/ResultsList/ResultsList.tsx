import style from "./ResultsList.module.scss";
import ResultCard from "@/components/Atoms/ResultCard/ResultCard";
import Image from "next/image";
import { ResultsListProps } from "@/interfaces/interfaces";
import React from "react";

const ResultsList = (props: ResultsListProps) => {
  const { interviewDetails, evaluationResult } = props;

  return (
    <>
      {interviewDetails && evaluationResult && (
        <>
          <header className={style.header}>
            <h2>Risultati</h2>
            <h2 className={style.sectionTitle}>{interviewDetails.topic}</h2>

            <div className={style.avatarContainer}>
              <div className={style.avatarBox}>
                <Image src={interviewDetails.interviewer.avatarSrc} alt="Interviewer Avatar" width={160} height={160} priority />
              </div>
              <span>{interviewDetails.interviewer.name}</span>
            </div>

            <div className={style.feedbackSection}>
              <h3>
                {" "}
                <span>Punteggio: </span>
                {evaluationResult.globalEvaluation.points}/{evaluationResult.globalEvaluation.outOf}
              </h3>
              <p>{evaluationResult.globalEvaluation.feedback}</p>
            </div>
          </header>
        </>
      )}

      {evaluationResult && (
        <>
          <ul className={style.resultsList}>
            {evaluationResult.evaluatedResponses.map((response, index) => (
              <li key={index}>
                <ResultCard response={response} index={index} />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default ResultsList;
