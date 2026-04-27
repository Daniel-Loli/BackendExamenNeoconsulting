
import analyticsRoutes from "./routes/analytics.js";
import express from "express";
import cors from "cors";
import { BigQuery } from "@google-cloud/bigquery";


const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK");
});

app.use("/api", analyticsRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});


