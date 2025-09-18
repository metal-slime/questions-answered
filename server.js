import express from "express";
import questionsRouter from "./routes/questions.js";
import heartbeatRouter from "./routes/heartbeat.js";
import { runPromptUntilExit } from "./utils/prompt.js";
import { config } from "./config/config.js"

const PORT = 3000;

const app = express();

app.use(express.json());

app.use("/questions", questionsRouter);
app.use("/heartbeat", heartbeatRouter);


// Start the app, if no API keys are provided, close the app
if (!config.ANTHROPIC_API_KEY && !config.GEMINI_API_KEY && !config.CHATGPT_API_KEY) {
  console.log("At least one API Key must be provided");
  process.exit(0);
} else {
  app.listen(PORT, () => {
    runPromptUntilExit();
  });
}


process.on("uncaughtException", (err) => {
  // Log the uncaught exception and exit application
  console.error("Uncaught Exception:", err);
  process.exit(0);
});


process.on("unhandledRejection", (reason, promise) => {
  // Log the unhandled rejection
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});