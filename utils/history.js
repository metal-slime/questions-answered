import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getHistory = async () => {
  const filePath = path.join(__dirname, 'history.json');
  const history = await fs.readFile(filePath);
  return JSON.parse(history.toString());
}

export const setHistory = async (question, answer) => {
  try {
    const json = await getHistory();

    json.push({
      "question": question.endsWith('? history') ? question.replace('? history', '?') : question,
      "answer": answer
    })

    await fs.writeFile(path.join(__dirname, 'history.json'), JSON.stringify(json));

    return true;
  } catch (err) {
    console.log('An error has occured saving user history.')
  }
}