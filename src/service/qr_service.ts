import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import QrCamoTemplate from "../template/qrcamo";

const fontData = Bun.file("./font/PlusJakartaSans-SemiBold.ttf").arrayBuffer();

export class QrService {
  static async generateQrCamo(data: string): Promise<Buffer> {
    // Render React component ke SVG menggunakan satori
    const template = await QrCamoTemplate({ data });
    const svg = await satori(template, {
      width: 250,
      height: 300,
      fonts: [
        {
          name: "Plus Jakarta Sans",
          data: await fontData,
          weight: 600,
          style: "normal",
        },
      ],
    });

    // Konversi SVG ke PNG menggunakan resvg
    const resvg = new Resvg(svg, {
      background: "rgba(255, 255, 255, 1)",
      fitTo: {
        mode: "width",
        value: 1000,
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return Buffer.from(pngBuffer);
  }
}
