import { Hono } from "hono";
import { qrHandler } from "./handler/qr_handler";

const app = new Hono();

app.get("/", (c) => {
  return c.text("QRCamo - QR Code Generator API");
});

// Mount QR handler
app.route("/qr", qrHandler);

export default app;
