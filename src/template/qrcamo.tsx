import * as QRCode from "qrcode";

export interface QrCamoTemplateProps {
  data: string;
}

export default async function QrCamoTemplate({ data }: QrCamoTemplateProps) {
  const vshape = await Bun.file("./asset/vshape.svg").arrayBuffer();
  const vshapeBase64 = Buffer.from(vshape).toString("base64");

  const qrCode = await QRCode.toDataURL(data, {margin: 0})
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        fontFamily: "Plus Jakarta Sans",
        padding: 16,
      }}
    >
      <div style={{display: "flex", position: "relative", width: 180, height: 180}}>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: 0, left: 0}}>
          <img src={qrCode} style={{width: 180/2, height: 180/2, backgroundColor: "#000"}} />
        </div>
        <img
          src={`data:image/svg+xml;base64,${vshapeBase64}`}
          width={180}
          height={180}
          style={{
            borderRadius: 8,
          }}
        />
      </div>
      <p
        style={{
          marginTop: 12,
          fontSize: 14,
          color: "#333333",
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        {data}
      </p>
    </div>
  );
}
