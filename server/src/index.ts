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

const createItemSchema = z.object({
    url: z.url(),
});

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

const fetchTitle = async (url: string): Promise<string | null> => {
    try {
        const res = await fetch(url, { redirect: "follow" });
        const html = await res.text();
        const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
        return match?.[1]?.trim() ?? null;
    } catch (error) {
        console.error("Error fetching title", error);
        return null;
    }
}

app.post("/items", async (req, res) => {
    const parsedItem = createItemSchema.safeParse(req.body);
    if (!parsedItem.success) {
        return res.status(400).json({ error: parsedItem.error.message });
    }
    const { url } = parsedItem.data;
    const title = await fetchTitle(url);

    const result = await pool.query(
        `insert into items (url, title) values ($1, $2) returning *`,
        [url, title]
    );
    res.status(201).json(result.rows[0]);
});

app.get("/items", async (_req, res) => {
    const result = await pool.query(`select * from items order by created_at desc`);
    res.json(result.rows);
});

app.get("/items/:id", async (req, res) => {
    const result = await pool.query(`select * from items where id = $1`, [req.params.id]);
    const item = result.rows[0];
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
});