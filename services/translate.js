import pkg from "@google-cloud/translate";
const { Translate } = pkg.v2;

const translate = new Translate();

export const translateText = async (text, target = "es") => {
  try {
    if (!text) return text;

    const [translation] = await translate.translate(text, target);
    return translation;

  } catch (error) {
    console.error("Error traduciendo:", error.message);
    return text;
  }
};