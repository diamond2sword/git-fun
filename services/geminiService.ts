
import { GoogleGenAI, Modality } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Helper to get client instance.
// Note: In a real app, handle empty API key gracefully in UI.
const getClient = () => {
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const sendChatMessage = async (history: {role: string, text: string}[], newMessage: string) => {
  try {
    const ai = getClient();
    // Using the complex text task model as requested for chatbot
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: "You are a helpful, encouraging coding tutor for a gamified learning app. Keep answers concise, use analogies, and encourage the user. If they ask about Python, Java, C, C++, or C#, provide examples in those languages.",
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
  } catch (error) {
    console.error("Chat error:", error);
    return "I'm having trouble connecting to the coding mainframe. Please try again later.";
  }
};

export const editImageWithGemini = async (base64Image: string, prompt: string): Promise<string | null> => {
  try {
    const ai = getClient();
    // Using gemini-2.5-flash-image for image editing/generation as requested
    // "Nano banana" alias refers to gemini-2.5-flash-image
    
    // Clean base64 string if it has data URI prefix
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png', // Assuming PNG for simplicity, or detect from source
              data: cleanBase64
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        responseModalities: [Modality.IMAGE],
      }
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];
    if (part && part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) {
    console.error("Image edit error:", error);
    throw error;
  }
};

export const checkCodeWithAI = async (code: string, language: string, taskDescription: string) => {
    try {
        const ai = getClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze this ${language} code: \n\`\`\`${code}\`\`\`\n\nTask: ${taskDescription}\n\nDoes this code correctly solve the task? Return ONLY a JSON object with format: { "correct": boolean, "feedback": "string" }`,
            config: {
                responseMimeType: "application/json"
            }
        });
        return JSON.parse(response.text || '{}');
    } catch (e) {
        console.error(e);
        return { correct: false, feedback: "AI Analysis failed." };
    }
}
