import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export const getResponseFromGenAi = async ({
  request,
}: {
  request: string;
}) => {
  const prompt = `넌 AI 목표 플래너야. 사용자의 목표는 ${request} 야. 이 목표를 달성하기 위해 필요한 실천 계획을 세부 항목으로 구체적으로 나눠서 JSON으로 출력해줘. 예시 형식: [
    {
    theme: ('공부','운동','기타' 이중에 하나로 해줘),
    todos: [week1: ['강의 듣기', '이력서 작성하기','포트폴리오 완성'], week2: ['자격증 예약', '자격증 공부']],
    comment: '동기부여 한마디',
    }
    ]`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
};
