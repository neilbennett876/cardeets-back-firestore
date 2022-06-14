import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {
  addMPG,
  addRecord,
  getAllRecords,
  getSingleRecord,
  updateMileage,
} from "./src/services/actions.js";

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.get("/test", (req, res) => {
  res.send("Testing");
});

app.get("/diary", getAllRecords);
app.get("/diary/:recordId", getSingleRecord);
app.post("/diary", addRecord);
app.patch("/diary/:recordId", updateMileage);
app.patch("/diary/mpg/:recordId", addMPG);

export const api = functions.https.onRequest(app);
