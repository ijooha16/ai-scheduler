import { prompt } from "@/utils/genai/prompt";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export const getResponseFromGenAi = async ({
  request,
  nickname,
}: {
  request: string;
  nickname: string;
}) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt(request, nickname),
    config: {
      responseMimeType: "application/json",
    },
  });
  return response.text;
};
