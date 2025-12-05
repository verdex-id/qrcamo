import { Hono } from "hono";
import { patternHandler } from "./handler/pattern_handler";
import { serveStatic } from "hono/bun";

const app = new Hono();

// Mount static files
app.use("/asset/*", serveStatic({ root: "./" }));

app.route("/pattern", patternHandler);

export default app;
