import { FC } from "hono/jsx";
import { Pattern } from "../db/db";

export type IndexPageProps = {
  pattern: Pattern;
};

const containerStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  height: "80vh",
  margin: "0 auto",
  padding: "0 40px",
};

export const IndexPage: FC<IndexPageProps> = ({ pattern }) => {
  return (
    <html>
      <head>
        <title>QrCamo</title>
      </head>
      <body>
        {/* grid cols-3 */}
        <div style={containerStyles}>
          {pattern.codeArray.map((code) => (
            <div key={code}>
              <img
                src={`/asset/pattern/${code}.png`}
                alt={code}
                width={500}
                height={500}
              />
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center" }}>
          {pattern.id} | Created at:{" "}
          {new Date(pattern.timestamp).toLocaleString()}
        </p>
      </body>
    </html>
  );
};
