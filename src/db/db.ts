import { Database } from "bun:sqlite";

export const db = new Database("qrcamo.db");

export const createTables = db.exec(`
  CREATE TABLE IF NOT EXISTS patterns (
    timestamp INTEGER PRIMARY KEY,
    codes TEXT
  );
  CREATE TABLE IF NOT EXISTS presence (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codes TEXT,
    timestamp INTEGER,
    npm TEXT,
    name TEXT
  );
`);

export type Pattern = {
  id: number;
  timestamp: number;
  codes: string;
  codeArray: string[];
};

export type Presence = {
  id: number;
  codes: string;
  timestamp: number;
  npm: string;
  name: string;
};

export const queryGetCurrentPattern = db.prepare<Pattern, []>(
  "SELECT * FROM patterns ORDER BY timestamp DESC LIMIT 1"
);

export const queryGetPresenceLeaderboard = db.prepare<Presence, string>(
  "SELECT * FROM presence WHERE codes = ? ORDER BY timestamp ASC LIMIT 10"
);

export const queryAddPattern = db.prepare<Pattern, [number, string]>(
  "INSERT INTO patterns (timestamp, codes) VALUES (?, ?)"
);

export const queryAddPresence = db.prepare<
  Presence,
  [string, number, string, string]
>("INSERT INTO presence (codes, timestamp, npm, name) VALUES (?, ?, ?, ?)");
