import { NextApiRequest, NextApiResponse } from "next";
import { storage } from "@/lib/firebaseConfig"; // Assicurati di configurare Firebase Storage qui
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Importa i metodi necessari
import { db } from "@/lib/firebaseConfig"; // Importa Firestore
import { doc, updateDoc } from "firebase/firestore"; // Importa le funzioni di Firestore

const uploadInterviewMedia = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { userId, file, sessionId } = req.body; // Assicurati di inviare l'ID utente, il file e l'ID della sessione nel payload

      // Crea un riferimento al file nel bucket di Firebase Storage
      const storageRef = ref(storage, `interviews/${userId}/${file.name}`);

      // Carica il file
      const snapshot = await uploadBytes(storageRef, file);

      // Ottieni l'URL del file caricato
      const downloadURL = await getDownloadURL(snapshot.ref); // Modificato per usare getDownloadURL importato

      // Salva l'URL nel documento Firestore della sessione
      const sessionRef = doc(db, "interviewSessions", sessionId);
      await updateDoc(sessionRef, {
        mediaURL: downloadURL, // Aggiungi il campo mediaURL (o qualsiasi altro campo tu stia utilizzando)
      });

      res.status(200).json({ message: "File caricato e URL salvato con successo!", downloadURL });
    } catch (error) {
      console.error("Errore durante il caricamento del file:", error);
      res.status(500).json({ message: "Errore durante il caricamento del file.", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default uploadInterviewMedia;
