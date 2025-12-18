
import { GoogleGenAI } from "@google/genai";
import { EVENT_DETAILS, GUESTS } from "../constants";

export const getGeminiConciergeResponse = async (userPrompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    你是一个优雅且专业的AI会议助手，服务于"${EVENT_DETAILS.name}"。
    你的目标是协助参会嘉宾了解座位安排、会议日程以及场馆设施。
    
    会议信息：
    - 日程安排: ${JSON.stringify(EVENT_DETAILS.schedule)}
    - 场馆设施: ${EVENT_DETAILS.facilities}
    - 会议地点: ${EVENT_DETAILS.venue}
    
    座位查询规则：
    - 如果嘉宾询问座位，请礼貌地询问他们的姓名。
    - 如果他们提供了姓名，请在以下名单中查找（不区分大小写）：${JSON.stringify(GUESTS.map(g => ({ name: g.name, table: g.table, seat: g.seat })))}。
    - 查找到后，告知他们的桌号和座位号。
    
    请始终保持礼貌、专业且热情的语气。回答请简洁明了，使用中文。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "抱歉，我暂时无法处理您的请求。请稍后再试或咨询现场工作人员。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "系统繁忙，请联系现场礼宾人员协助您。";
  }
};
