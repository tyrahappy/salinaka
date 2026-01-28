import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 4001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = process.env.DB_PATH || path.join(__dirname, "ab-events.db");

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    experiment_id TEXT NOT NULL,
    variant TEXT NOT NULL,
    event_name TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    url TEXT,
    referrer TEXT,
    user_id TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_events_experiment
    ON events (experiment_id, variant, event_name);
`);

app.use(cors());
app.use(express.json({ limit: "64kb" }));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/events", (req, res) => {
  const {
    experimentId,
    variant,
    event,
    timestamp,
    url,
    referrer,
    userId,
  } = req.body || {};

  if (!experimentId || !variant || !event) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const stmt = db.prepare(
    `INSERT INTO events (experiment_id, variant, event_name, timestamp, url, referrer, user_id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );

  stmt.run(
    experimentId,
    variant,
    event,
    Number(timestamp || Date.now()),
    url || null,
    referrer || null,
    userId || null
  );

  return res.json({ status: "stored" });
});

app.get("/stats", (req, res) => {
  const { experimentId } = req.query;
  if (!experimentId) {
    return res.status(400).json({ error: "experimentId is required." });
  }

  const rows = db
    .prepare(
      `SELECT variant,
              SUM(CASE WHEN event_name = 'experiment_exposed' THEN 1 ELSE 0 END) AS views,
              SUM(CASE WHEN event_name = 'add_to_cart' THEN 1 ELSE 0 END) AS clicks
       FROM events
       WHERE experiment_id = ?
       GROUP BY variant`
    )
    .all(experimentId);

  const variants = rows.reduce((acc, row) => {
    const views = row.views || 0;
    const clicks = row.clicks || 0;
    acc[row.variant] = {
      views,
      clicks,
      ctr: views > 0 ? clicks / views : 0,
    };
    return acc;
  }, {});

  return res.json({
    experimentId,
    variants,
  });
});

app.listen(PORT, () => {
  console.log(`A/B backend listening on http://localhost:${PORT}`);
});
