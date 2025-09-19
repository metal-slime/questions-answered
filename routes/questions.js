import express from "express";
import { body, validationResult } from "express-validator";
// import Anthropic from "@anthropic-ai/sdk";
import { config } from "../config/config.js"
import { generateGeminiContent } from "../utils/gemini.js";
import { checkCitationsExist, checkForCitations } from "../utils/checks.js";


const router = express.Router();

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
      let result = false;
      switch (engine) {
        case "gemini":
          const response = await generateGeminiContent(question, useHistory);
          result = response.text;
          break;
        case "anthropic":
          break;
        case "chatGPT":
          break;
      }

      if (result) {
        // Run our citation checks. If any citations don't match, do something else here to alert user
        const citations = await checkForCitations(result);
        if (citations.length > 0) {
          const checkedCitations = await checkCitationsExist(citations);
        }
      }

      resolve(result);
    } catch (error) {
      console.error("An error has occured generating the answer", error);
      reject(error);
    }
  });
};


export default router;
