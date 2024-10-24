import { NextApiRequest, NextApiResponse } from "next";
import { storage } from "@/lib/firebaseConfig"; // Assicurati di configurare Firebase Storage qui
import { ref, getDownloadURL } from "firebase/storage";

const getInterviewMedia = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { userId, fileName } = req.query; // Assicurati di inviare l'ID utente e il nome del file nella query

      // Crea un riferimento al file nel bucket di Firebase Storage
      const fileRef = ref(storage, `interviews/${userId}/${fileName}`);

      // Ottieni l'URL del file
      const downloadURL = await getDownloadURL(fileRef);

      res.status(200).json({ downloadURL });
    } catch (error) {
      console.error("Errore durante il recupero del file:", error);
      res.status(500).json({ message: "Errore durante il recupero del file.", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default getInterviewMedia;
