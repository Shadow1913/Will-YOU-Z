import { GoogleGenAI } from "@google/genai";

// Use environment variable for the API key with a fallback for local development/safety
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.API_KEY || "";

export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateCosmicMessage = async (name: string) => {
  if (!ai) return "The stars are quiet tonight, but your light still shines bright.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, poetic, one-sentence compliment for someone named ${name}. 
      The vibe should be cosmic, elegant, and deeply appreciative. 
      Avoid cliches. Mention stars, galaxies, or light.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text || "You are the constant in a shifting universe.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Your presence is a galaxy of warmth in a vast world.";
  }
};