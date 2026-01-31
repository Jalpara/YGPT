import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';

const getClient = () => {
  if (!apiKey) return null;
  try {
    return new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error("Gemini client init error:", error);
    return null;
  }
};

export const generateFanArt = async (prompt: string, base64Image?: string): Promise<string | null> => {
  try {
    const ai = getClient();
    if (!ai) {
      console.warn("Gemini API key missing; fan art generation disabled.");
      return null;
    }

    const model = 'gemini-2.5-flash-image'; // Using 2.5 flash image for fast, accessible generation
    
    let contents: any = { parts: [] };
    
    if (base64Image) {
        contents.parts.push({
            inlineData: {
                mimeType: 'image/png', // Assuming PNG for simplicity, could be derived
                data: base64Image
            }
        });
        contents.parts.push({ text: `Modify this image based on the prompt: ${prompt}` });
    } else {
        contents.parts.push({ text: `Create a colorful, uplifting artistic image for YGPT (Youth For Global Peace and Transformation) based on: ${prompt}` });
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        // Nano banana models don't support responseMimeType
      }
    });

    // Iterate to find image part
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
    }
    
    return null;
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};

export const chatWithYGPT = async (message: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
    try {
        const ai = getClient();
        if (!ai) {
            return "I’m here and ready to help! The AI features need a GEMINI_API_KEY to respond in real time.";
        }

        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            history: history,
            config: {
                systemInstruction: "You are the AI Ambassador for YGPT (Youth For Global Peace and Transformation). You are energetic, peaceful, wise, and helpful. You explain YGPT's mission to empower youth through yoga, meditation, and leadership. Keep answers concise and inspiring."
            }
        });

        const response: GenerateContentResponse = await chat.sendMessage({ message });
        return response.text || "I'm meditating on that thought... please try again.";
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        return "Ideally, I would answer that, but I'm having trouble connecting to the universal consciousness (API Error).";
    }
}
