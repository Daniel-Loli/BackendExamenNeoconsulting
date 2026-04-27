import { VertexAI } from "@google-cloud/vertexai";

export const generateInsight = async (data) => {
  try {
    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: "global"
    });

    const model = vertexAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const d = data[0];

    const prompt = `
Eres un analista senior de ecommerce.

Datos:
Ingresos: ${d.ingresos_totales}
Órdenes: ${d.ordenes_totales}
Ticket promedio: ${d.ticket_promedio}
Cancelaciones: ${d.tasa_cancelacion}
Devoluciones: ${d.tasa_devolucion}

Genera:
- Insights clave
- Problemas
- Recomendaciones
`;

    const result = await model.generateContent(prompt);

    return result.response.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo generar insight";

  } catch (error) {
    console.error("Error Vertex:", error.message);
    return "Error generando insights";
  }
};