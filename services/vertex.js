import { VertexAI } from "@google-cloud/vertexai";

const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: "us-central1"
});

const model = vertexAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

export const generateInsight = async (data) => {
  const d = data[0];

  const prompt = `
Eres un analista senior de ecommerce.

Analiza estos datos:

Ingresos: ${d.ingresos_totales}
Órdenes: ${d.ordenes_totales}
Ticket promedio: ${d.ticket_promedio}
Cancelaciones: ${d.tasa_cancelacion}
Devoluciones: ${d.tasa_devolucion}
Tiempo de entrega: ${d.tiempo_promedio_entrega}

Genera:
1. Hallazgos clave
2. Problemas
3. Recomendaciones accionables
`;

  const result = await model.generateContent(prompt);

  return result.response.candidates[0].content.parts[0].text;
};