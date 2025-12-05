import { Hono } from "hono";
import { PatternService } from "../service/pattern_service";
import { IndexPage } from "../pages";

export const patternHandler = new Hono();

patternHandler.get("/", async (c) => {
  const pattern = await PatternService.generatePattern();
  return c.html(<IndexPage pattern={pattern} />);
});

patternHandler.post("/scan", async (c) => {
  const { code, npm, name } = await c.req.json();
  const id = await PatternService.scan(code, npm, name);
  return c.json({ success: true, id });
});

patternHandler.get("/leaderboard", async (c) => {
  const codes = c.req.query("codes");
  if (!codes) {
    return c.json({ success: false, message: "Codes are required" }, 400);
  }
  const leaderboard = await PatternService.getLeaderboard(codes);
  return c.json({ success: true, leaderboard });
});
