import PouchDB from 'pouchdb';

// Definiere die benutzerdefinierten Typen
interface Puzzle {
  _id: string;
  title: string;
  createdAt: Date;
}

interface UserDoc {
  _id: string;
  points?: number; // Optional, da es initial nicht gesetzt sein könnte
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
  let userDoc: PouchDB.Core.Document<UserDoc> | undefined;
  try {
    userDoc = await db.get(userDocId) as PouchDB.Core.Document<UserDoc>;
    if (!userDoc.points) userDoc.points = 0; // Initialisiere points, wenn nicht vorhanden
  } catch (error) {
    userDoc = { _id: userDocId, points: 0 };
    await db.put(userDoc);
  }
  userDoc.points = (userDoc.points || 0) + points;
  await db.put(userDoc);
  return userDoc.points;
};