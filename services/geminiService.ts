import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  // In a real app, this would be securely handled.
  // Based on instructions, we use process.env.API_KEY directly.
  if (!process.env.API_KEY) {
    console.warn("API_KEY is missing from environment variables.");
    // Returning null to handle gracefully in UI
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const askGeminiAboutContent = async (
  context: string,
  question: string
): Promise<string> => {
  const ai = getAIClient();
  if (!ai) {
    return "I'm sorry, I cannot answer right now because the API Key is missing.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a helpful and knowledgeable teaching assistant.
      Your task is to answer the user's question based STRICTLY on the provided context (Tutorial Content).
      If the answer is not in the context, say so politely, but try to infer helpful info if possible within the domain.
      Keep answers concise and easy to read.

      ---
      CONTEXT:
      ${context}
      ---
      USER QUESTION:
      ${question}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};

export const generateContentSummary = async (content: string): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "";

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Analyze the following tutorial content and provide a concise, engaging summary (max 3 sentences). 
      Capture the key takeaways.

      ---
      CONTENT:
      ${content.substring(0, 10000)} 
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "";
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "";
  }
};