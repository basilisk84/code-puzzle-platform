import PouchDB from 'pouchdb';

const db = new PouchDB('puzzles');

export const createPuzzle = async (title: string) => {
  const puzzle = {
    _id: new Date().toISOString(),
    title,
    createdAt: new Date(),
  };
  await db.put(puzzle);
  return puzzle;
};

export const getPuzzles = async () => {
  const result = await db.allDocs({ include_docs: true });
  return result.rows.map((row) => row.doc);
};

export const addPoints = async (userId: string, points: number) => {
  const userDocId = `user_${userId}`;
  let userDoc;
  try {
    userDoc = await db.get(userDocId);
  } catch (error) {
    userDoc = { _id: userDocId, points: 0 };
  }
  userDoc.points = (userDoc.points || 0) + points;
  await db.put(userDoc);
  return userDoc.points;
};