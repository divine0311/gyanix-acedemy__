import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// The app sits behind a proxy (Vercel rewrites → Render), so we must trust
// the first X-Forwarded-For hop for req.ip / rate limiting to see real users.
const trustProxyRaw = process.env["TRUST_PROXY"] ?? "1";
app.set(
  "trust proxy",
  trustProxyRaw === "true" ? true : trustProxyRaw === "false" ? false : Number(trustProxyRaw),
);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", router);

export default app;
