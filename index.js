import express from "express";
import cors from "cors";
import analyticsRoutes from "./routes/analytics.js";

const app = express();

// 🔥 CONFIG CORS SEGURA
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// 🔹 health check
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// 🔹 rutas
app.use("/api", analyticsRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});