import express from "express";
import { body, validationResult } from "express-validator";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenAI } from "@google/genai";
import { config } from "../config/config.js"
import { getHistory } from "../utils/history.js";


const router = express.Router();

const ai = new GoogleGenAI({apiKey: config.GEMINI_API_KEY});

router.post("/", body("question", "Question is required.").trim().notEmpty(), async (req, res) => {
  try {
    // Validate that a question is attached to the body
    const validRequest = validationResult(req);
    
    if (validRequest.isEmpty()) {
      const question = req.body.question || false;
      const useHistory = req.body.useHistory || false;
      let response = await callGenerator(question, useHistory);

      if (!response) {
        response = "Question could not be answered."
      }

      res.status(200).json({"answer": response});
    } else {
      // No question, respond that question is needed
      console.log(validRequest.array())
      res.status(400).json({ errors: validRequest.array() });
    }
  } catch (err) {
    // If error, return 500
    console.log(err);
    res.sendStatus(500);
  }
})

router.get("/history", (req, res) => {
  try {
    // Convert the history file to a user database in the future and access it through a get/post endpoint combination
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})

const callGenerator = async (question, useHistory = false, engine = config.default) => {
  return new Promise(async (resolve, reject) => {
    // Use a middle level function to be able to expand to use any LLM provider
    try {
      switch (engine) {
        case "gemini":
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
              ]
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
          resolve(response.text);
          break;
        case "anthropic":
          resolve(false);
          break;
        case "chatGPT":
          resolve(false);
          break;
      }
    } catch (error) {
      console.error("An error has occured generating the answer", error);
      reject(error);
    }
  });
};


export default router;
