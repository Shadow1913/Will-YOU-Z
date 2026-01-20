import { GoogleGenAI } from "@google/genai";

/**
 * Handles initialization of the Google GenAI SDK.
 * In production (GitHub Pages), the VITE_GEMINI_API_KEY environment variable should be set.
 */
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.API_KEY || "";

// Only initialize if an API key is present to prevent crashes
export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Generates a poetic message using the Gemini 3 model.
 */
export const generateCosmicMessage = async (name: string) => {
  if (!ai) {
    return "The stars are quiet tonight, but your light still shines bright.";
  }

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
    console.error("Gemini API Error:", error);
    return "Your presence is a galaxy of warmth in a vast world.";
  }
};