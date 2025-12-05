import { Hono } from "hono";
import { QrService } from "../service/qr_service";

export const qrHandler = new Hono();

qrHandler.get("/", async (c) => {
  const data = c.req.query("data");

  if (!data) {
    return c.json({ error: "Data query parameter is required" }, 400);
  }

  const imageBuffer = await QrService.generateQrCamo(data);

  return new Response(new Uint8Array(imageBuffer), {
    headers: {
      "Content-Type": "image/png",
      "Content-Length": imageBuffer.length.toString(),
    },
  });
});
