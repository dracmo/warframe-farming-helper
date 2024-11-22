import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/storage";
import { useSession } from "next-auth/react";

// Custom hook to sync checkedCells to the database
export function useSyncCheckedCells() {
  const { data: session } = useSession();
  const checkedCells = useAppStore((state) => state.checkedCells);
  const setCheckedCells = useAppStore((state) => state.setCheckedCells);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasFetchedInitialData = useRef(false);
  const delayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!session) {
      // L'utilisateur n'est pas connecté
      setShowLoginMessage(true);
      return; // Ne rien faire de plus
    } else {
      // L'utilisateur est connecté
      setShowLoginMessage(false);
    }

    // Retarder l'activation de 5 secondes après la connexion
    if (!hasFetchedInitialData.current) {
      delayTimerRef.current = setTimeout(() => {
        hasFetchedInitialData.current = true;

        (async () => {
          try {
            const response = await fetch("/api/get-data", {
              method: "GET",
            });

            if (response.ok) {
              const data = await response.json();
              if (data.checkedCells) {
                // Mettre à jour le store Zustand avec les données de la base de données
                setCheckedCells(data.checkedCells);
              }
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        })();
      }, 5000); // Délai de 5 secondes
    }

    // Nettoyer le timer en cas de déconnexion
    return () => {
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
      }
    };
  }, [session, setCheckedCells]);

  useEffect(() => {
    if (!session) {
      // L'utilisateur n'est pas connecté
      return; // Ne pas continuer
    }

    // Effacer le timer existant
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Définir un nouveau timer pour synchroniser les données après 45 secondes
    timerRef.current = setTimeout(async () => {
      try {
        // Envoyer une requête POST pour sauvegarder les données dans la base de données
        const response = await fetch("/api/save-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ checkedCells }),
        });
        console.log("Data saved");

        if (!response.ok) {
          throw new Error("Failed to save data");
        }
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }, 10000); // Délai de 45 secondes

    // Nettoyer le timer lors du démontage
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [checkedCells, session]);

  return { showLoginMessage };
}
