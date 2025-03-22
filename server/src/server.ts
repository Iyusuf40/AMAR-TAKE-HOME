import express from "express";
import cors from "cors";
import { HTTP_STATUS } from "./constants";
import quotesRoute from "./quotes/routes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.use("/api", quotesRoute);

app.use((req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({ error: true, message: "The requested resource was not found." });
});

process.on("uncaughtException", console.error);

const PORT = process.env.PORT || 2025;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;