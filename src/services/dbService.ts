import PouchDB from 'pouchdb';

// Definiere die benutzerdefinierten Typen mit _id als Pflichtfeld
interface Puzzle {
  _id: string; // PouchDB erfordert _id
  title: string;
  createdAt: Date;
}

interface UserDoc {
  _id: string; // PouchDB erfordert _id
  points?: number;
}

const db = new PouchDB('puzzles');

export const createPuzzle = async (title: string): Promise<Puzzle> => {
  const puzzle: Puzzle = {
    _id: new Date().toISOString(),
    title,
    createdAt: new Date(),
  };
  await db.put(puzzle);
  return puzzle;
};

export const getPuzzles = async (): Promise<Puzzle[]> => {
  const result = await db.allDocs<Puzzle>({ include_docs: true });
  return result.rows
    .map((row) => row.doc as Puzzle | undefined)
    .filter((doc): doc is Puzzle => doc !== undefined);
};

export const addPoints = async (userId: string, points: number): Promise<number> => {
  const userDocId = `user_${userId}`;
  let userDoc: UserDoc;
  try {
    userDoc = await db.get(userDocId) as UserDoc;
    if (!userDoc.points) userDoc.points = 0; // Initialisiere points, wenn nicht vorhanden
  } catch (error) {
    userDoc = { _id: userDocId, points: 0 };
  }
  userDoc.points = (userDoc.points || 0) + points;
  await db.put(userDoc);
  return userDoc.points;
};