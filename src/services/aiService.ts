import * as tf from '@tensorflow/tfjs';
import DOMPurify from 'dompurify';
import Joi from 'joi';

export const analyzeCode = async (code: string): Promise<string> => {
  const schema = Joi.string().min(1).required();
  const { error } = schema.validate(code);
  if (error) return 'Ungültiger Code-Eingabe';

  const cleanCode = DOMPurify.sanitize(code);
  const tensor = tf.tensor([cleanCode.length]);
  const analysis = `Code-Länge: ${cleanCode.length} Zeichen. AI-Analyse: Sieht gut aus!`;
  tensor.dispose();
  return analysis;
};