interface Puzzle {
      _id: string;
      title: string;
      createdAt: Date;
    }

    export const getPuzzles = async (): Promise<Puzzle[]> => {
      // Platzhalter: Simuliert eine API-Anfrage
      return [
        { _id: "1", title: "Testpuzzle", createdAt: new Date() },
      ];
    };

    export const createPuzzle = async (title: string): Promise<Puzzle> => {
      // Platzhalter: Simuliert Puzzle-Erstellung
      const newPuzzle = {
        _id: Date.now().toString(),
        title,
        createdAt: new Date(),
      };
      return newPuzzle;
    };

    export const addPoints = async (userId: string, points: number): Promise<number> => {
      // Platzhalter: Simuliert Punkte hinzufügen
      return points; // Hier könntest du eine echte Speicherlogik hinzufügen
    };