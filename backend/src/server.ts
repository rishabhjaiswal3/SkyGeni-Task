import express from "express";
import { organizeData } from "./controller/index";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/data", (req, res, next) => {
  organizeData(req, res, next);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
