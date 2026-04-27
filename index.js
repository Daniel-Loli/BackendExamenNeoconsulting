import express from "express";
import cors from "cors";
import analyticsRoutes from "./routes/analytics.js";

const app = express();

// 🔥 CONFIGURACIÓN CORS CORRECTA
app.use(
  cors({
    origin: "*", // en desarrollo permite todo
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// 🔥 MUY IMPORTANTE: manejar preflight
app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Ecommerce funcionando 🚀");
});

app.use("/api", analyticsRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});