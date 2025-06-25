export const runCode = async (code: string): Promise<string> => {
  try {
    // Mock-Implementierung
    return `Code ausgeführt: ${code.substring(0, 20)}...`;
  } catch (error) {
    return `Fehler: ${error}`;
  }
};