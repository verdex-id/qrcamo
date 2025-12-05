import { expect, describe, it, afterAll } from "bun:test";
import { PatternService } from "./pattern_service";
import { Pattern } from "../db/db";

let pattern: Pattern | null = null;

describe("PatternService", () => {
  it("should generate patterns", async () => {
    const p = await PatternService.generatePattern();
    expect(p.codeArray.length).toBe(3);
    pattern = p;
  });
  it("should scan a code", async () => {
    const id = await PatternService.scan(
      pattern?.codes || "",
      "5220411040",
      "Agil Ghani Istikmal"
    );
    expect(id).toBe(1);
  });
  it("should get leaderboard", async () => {
    const leaderboard = await PatternService.getLeaderboard(
      pattern?.codes || ""
    );
    expect(leaderboard).toBeInstanceOf(Array);
    expect(leaderboard.length).toBe(1);
  });
});
