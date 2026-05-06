import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import { parseReceipt } from "./services/openaiService";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("Receipt Parser API Running");
});


app.post("/api/parse", upload.single("receipt"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    const imageBuffer = fs.readFileSync(req.file.path);

    const result = await parseReceipt(imageBuffer);

    res.json(result);
  } catch (error) {
    console.error("FULL BACKEND ERROR:");
    console.error(error);

    res.status(500).json({
      error: "Failed to parse receipt",
    });
  }
});

app.post("/api/receipts", (req, res) => {
  try {
    const receipt = req.body;

    let receipts = [];

    if (fs.existsSync("receipts.json")) {
      const data = fs.readFileSync("receipts.json", "utf-8");

      receipts = data ? JSON.parse(data) : [];
    }

    receipts.push(receipt);

    fs.writeFileSync(
      "receipts.json",
      JSON.stringify(receipts, null, 2)
    );

    res.json({
      message: "Receipt saved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to save receipt",
    });
  }
});

app.get("/api/receipts", (req, res) => {
  try {
    if (!fs.existsSync("receipts.json")) {
      return res.json([]);
    }

    const data = fs.readFileSync("receipts.json", "utf-8");

    const receipts = data ? JSON.parse(data) : [];

    res.json(receipts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch receipts",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});