import 'dotenv/config';
import express from "express";
import cors from "cors";
import { Pool } from "pg";
import { z } from "zod";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function connectToDatabase() {
    await pool.connect();
    console.log("Connected to database");
}

const port = Number(process.env.PORT) || 4000;

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.error("Error connecting to database", err);
    process.exit(1);
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});