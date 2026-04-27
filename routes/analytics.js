import express from "express";
import { runQuery } from "../services/bigquery.js";
import { generateInsight } from "../services/vertex.js";

const router = express.Router();
const DATASET = "nilton_ecommerce";


// ================= KPIs =================
router.get("/kpis", async (req, res) => {
  try {
    const data = await runQuery(`
      SELECT * FROM \`${DATASET}.vw_kpi_overview\`
    `);

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================= SALES =================
router.get("/sales", async (req, res) => {
  try {
    const data = await runQuery(`
      SELECT * FROM \`${DATASET}.vw_sales_trend\`
      ORDER BY fecha
    `);

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================= SALES GROWTH =================
router.get("/sales-growth", async (req, res) => {
  try {
    const data = await runQuery(`
      SELECT * FROM \`${DATASET}.vw_sales_growth\`
      ORDER BY mes
    `);

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================= PRODUCTS =================
router.get("/products", async (req, res) => {
  try {
    const data = await runQuery(`
      SELECT * FROM \`${DATASET}.vw_top_products\`
      ORDER BY ranking_global
      LIMIT 20
    `);

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================= INVENTORY =================
router.get("/inventory", async (req, res) => {
  try {
    const data = await runQuery(`
      SELECT * FROM \`${DATASET}.vw_inventory_analysis\`
    `);

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================= LOGISTICS =================
router.get("/logistics", async (req, res) => {
  try {
    const data = await runQuery(`
      SELECT * FROM \`${DATASET}.vw_logistics_performance\`
    `);

    res.json(data[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================= FUNNEL =================
router.get("/funnel", async (req, res) => {
  try {
    const data = await runQuery(`
      SELECT * FROM \`${DATASET}.vw_funnel\`
    `);

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================= CUSTOMERS =================
router.get("/customers", async (req, res) => {
  try {
    const data = await runQuery(`
      SELECT * FROM \`${DATASET}.vw_customer_cohort\`
      ORDER BY cohorte_mes
    `);

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================= INSIGHTS =================
router.get("/insights", async (req, res) => {
  try {
    const data = await runQuery(`
      SELECT * FROM \`${DATASET}.vw_ai_insights_input\`
    `);

    let insight = "No disponible";

    try {
      insight = await generateInsight(data);
    } catch (e) {
      console.error("Vertex fallback:", e);
      insight = "No se pudo generar insight";
    }

    res.json({ insight });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;