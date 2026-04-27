import { VertexAI } from "@google-cloud/vertexai";

const getGoogleCloudProject = () => {
  return (
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.GCLOUD_PROJECT ||
    process.env.PROJECT_ID
  );
};

export const generateInsight = async (data) => {
  try {
    const projectId = getGoogleCloudProject();
    const location = process.env.VERTEX_LOCATION || "us-central1";
    const modelName = process.env.VERTEX_MODEL || "gemini-2.5-flash";

    if (!projectId) {
      throw new Error(
        "Falta la variable de entorno GOOGLE_CLOUD_PROJECT, GCLOUD_PROJECT o PROJECT_ID"
      );
    }

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