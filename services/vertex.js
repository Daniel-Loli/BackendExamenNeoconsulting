import { VertexAI } from "@google-cloud/vertexai";

export const generateInsight = async (data) => {
  try {
    // Valores hardcodeados directamente
    const projectId = "bussiness-case-tyc";
    const location = "us-central1";
    const modelName = "gemini-2.5-flash"; // Asegúrate de que el modelo 2.5 esté disponible en tu cuota/región

    const vertexAI = new VertexAI({
      project: projectId,
      location
    });

    const model = vertexAI.getGenerativeModel({
      model: modelName
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

    const request = {
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    };

    const result = await model.generateContent(request);
    
    const insight =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      result.response?.candidates?.[0]?.content?.[0]?.parts?.[0]?.text;

    return insight || "No se pudo generar insight";
  } catch (error) {
    console.error("Error Vertex:", error);
    return `Error generando insights: ${error.message}`;
  }
};