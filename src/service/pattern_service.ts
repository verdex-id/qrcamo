import { Glob } from "bun";
import {
  Pattern,
  Presence,
  queryAddPattern,
  queryAddPresence,
  queryGetCurrentPattern,
  queryGetPresenceLeaderboard,
} from "../db/db";

export class PatternService {
  static async generatePattern(): Promise<Pattern> {
    const patternImages = new Glob("./asset/pattern/*.png");
    let availablePatterns: string[] = [];
    for await (const patternImage of patternImages.scan(".")) {
      const filename = patternImage.split("/").pop();
      if (!filename) {
        continue;
      }
      const code = filename.split(".")[0];
      if (!code) {
        continue;
      }
      availablePatterns.push(code);
    }

    let patterns: string[] = [];
    while (patterns.length < 3) {
      const randomPattern =
        availablePatterns[Math.floor(Math.random() * availablePatterns.length)];
      patterns.push(randomPattern);
    }
    const timestamp = Date.now();
    const pattern = queryAddPattern.run(timestamp, patterns.join(","));
    if (!pattern.lastInsertRowid) {
      throw new Error("Failed to add pattern");
    }
    return {
      timestamp,
      codes: patterns.join(","),
      id: Number(pattern.lastInsertRowid),
      codeArray: patterns,
    };
  }

  static async scan(code: string, npm: string, name: string): Promise<number> {
    const currentPattern = queryGetCurrentPattern.get();
    if (!currentPattern) {
      throw new Error("Pattern not found");
    }
    if (currentPattern.codes !== code) {
      throw new Error("Code not match with current pattern");
    }
    const timestamp = Date.now();
    const presence = queryAddPresence.run(code, timestamp, npm, name);
    if (!presence.lastInsertRowid) {
      throw new Error("Presence not found");
    }
    return Number(presence.lastInsertRowid);
  }

  static async getLeaderboard(codes: string): Promise<Presence[]> {
    const leaderboard = queryGetPresenceLeaderboard.all(codes);
    if (!leaderboard) {
      throw new Error("Leaderboard not found");
    }
    return leaderboard;
  }
}
