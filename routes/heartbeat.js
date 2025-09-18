import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    // Return 200 if server is ok
    res.sendStatus(200);
  } catch (err) {
    // If error, return 500
    console.log(err);
    res.sendStatus(500);
  }
})

export default router;
