import express from "express";
import { runQuery } from "../services/bigquery.js";
import { translateText } from "../services/translate.js";
import { generateInsight } from "../services/vertex.js";
const router = express.Router();
const DATASET = "nilton_ecommerce";


// 🔹 Helper traducción
const translateResponse = async (rows, lang) => {
  if (lang !== "es") return rows;

  return Promise.all(
    rows.map(async (row) => {
      const newRow = {};

      for (const key in row) {
        newRow[key] =
          typeof row[key] === "string"
            ? await translateText(row[key], "es")
            : row[key];
      }

      return newRow;
    })
  );
};


// 🔹 KPIs
router.get("/kpis", async (req, res) => {
  try {
    const lang = req.query.lang || "en";

    const data = await runQuery(
      `SELECT * FROM \`${DATASET}.vw_kpi_overview\``
    );

    const result = await translateResponse(data, lang);

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔹 Ventas
router.get("/sales", async (req, res) => {
  try {
    const data = await runQuery(
      `SELECT * FROM \`${DATASET}.vw_sales_trend\``
    );

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔹 Productos
router.get("/products", async (req, res) => {
  try {
    const lang = req.query.lang || "en";

    const data = await runQuery(
      `SELECT * FROM \`${DATASET}.vw_top_products\``
    );

    const result = await translateResponse(data, lang);

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔹 Funnel
router.get("/funnel", async (req, res) => {
  try {
    const data = await runQuery(
      `SELECT * FROM \`${DATASET}.vw_funnel\``
    );

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🤖 INSIGHTS (IA READY)
router.get("/insights", async (req, res) => {
  try {
    const data = await runQuery(
      `SELECT * FROM \`${DATASET}.vw_ai_insights_input\``
    );

    const insight = await generateInsight(data);

    res.json({
      insight,
      data
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
export default router;