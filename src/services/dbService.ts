interface Puzzle {
       _id: string;
       title: string;
       createdAt: Date;
     }

     export const getPuzzles = async (): Promise<Puzzle[]> => {
       return [
         { _id: "1", title: "Testpuzzle", createdAt: new Date() },
       ];
     };

     export const createPuzzle = async (title: string): Promise<Puzzle> => {
       if (!title) throw new Error('Kein Titel angegeben');
       const newPuzzle = {
         _id: Date.now().toString(),
         title,
         createdAt: new Date(),
       };
       console.log('Puzzle created:', newPuzzle);
       return newPuzzle;
     };

     export const addPoints = async (points: number): Promise<number> => {
       if (isNaN(points)) throw new Error('Ungültige Punkte');
       console.log('Points updated:', points);
       return points;
     };