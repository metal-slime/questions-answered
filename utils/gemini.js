import { GoogleGenAI } from "@google/genai";
import { config } from "../config/config.js"
import { getHistory } from "../utils/history.js";

const ai = new GoogleGenAI({apiKey: config.GEMINI_API_KEY});

export const generateGeminiContent = (question, useHistory) => {
  return new Promise(async (resolve, reject) => {
    // Use a middle level function to be able to expand to use any LLM provider
    try {
      let contents = question;
      if (useHistory) {
        const history = await getHistory();
        if (history.length > 0) {
          const userHistory = [];
          const modelHistory = [];
          history.forEach((item) => {
            modelHistory.push({
              "text": item.answer
            });
            userHistory.push({
              "text": item.question
            });
          });
          userHistory.push({
            "text": question
          });
          contents = [
            {
              "role": "model",
              "parts": modelHistory
            },
            {
              "role": "user",
              "parts": userHistory
            },
          ];
        }
      }
      // Each case can be broken further in to its own function for clarity
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: contents,
        config: {
          thinkingConfig: {
            thinkingBudget: 0, // Disables thinking for demo purposes
          },
        }
      });
      // Map specific API result to standard format
      resolve(response);
    } catch (error) {
      console.error("An error has occured while getting the answer from Gemini", error);
      reject(error);
    }
  });
}