
import { GoogleGenAI, Type, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Decoding utilities as per guidelines
export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const generateSpeech = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say professionally: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Professional male-leaning voice
          },
        },
      },
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return null;
  }
};

export const getAITutorResponse = async (userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const model = 'gemini-3-flash-preview';
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: `You are Professor Kamba, a friendly and professional English tutor from Luanda, Angola. 
        Your goal is to help students practice English through natural conversation. 
        - Keep responses concise but encouraging.
        - Focus on professional and daily life topics (interviews, office greetings, travel).
        - If the student makes a mistake, gently point it out in a separate block or mention it naturally.
        - Use a warm tone.
        - Occasionally refer to Angolan landmarks or context (like Unitel, Luanda streets, or local business culture) to make it relatable.`,
        temperature: 0.7,
      },
    });

    return response.text || "Desculpe, tive um problema ao processar sua resposta. Pode repetir?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ocorreu um erro na conexão com o Professor Kamba.";
  }
};

export const getPronunciationFeedback = async (message: string) => {
  const model = 'gemini-3-flash-preview';
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Analyse the English pronunciation of the following sentence: "${message}". 
      Imagine the user is a Portuguese speaker from Angola. Identify specific phoneme or word errors.
      
      Return a JSON with the following structure:
      {
        "accuracy": number (0-100),
        "highlightedText": "HTML string where words or specific characters are wrapped in:
           - <span class='text-emerald-500'> for correct
           - <span class='text-amber-500 underline decoration-2'> for minor issues or wrong word stress
           - <span class='text-rose-500 underline font-black decoration-double'> for critical phoneme errors",
        "phoneticGuide": "A clear phonetic guide for the problematic parts (e.g. 'Look: /lʊk/ (não /luːk/)')",
        "tip": "A very specific tip in Portuguese about the tongue position or sound comparison for the detected errors."
      }`,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return { 
      accuracy: 0, 
      highlightedText: message, 
      phoneticGuide: "N/A", 
      tip: "Não foi possível analisar a sua voz neste momento." 
    };
  }
};
