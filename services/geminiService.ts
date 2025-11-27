import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateEndingReflection(score: number): Promise<string> {
  const modelId = 'gemini-2.5-flash';
  
  const prompt = `
    你是一位精通中國唐代文學的文學評論家。
    
    背景：
    玩家剛剛在遊戲中扮演了詩人**王維**，經歷了《送元二使安西》的創作過程。
    遊戲通過選項測試了玩家（王維）是抱著「固定思維」（悲觀、恐懼變化）還是「成長思維」（豁達、祝福、將離別視為新開始）來面對這次離別。
    
    玩家的「豁達/成長指數」得分是：${score} 分（滿分2分）。
    
    請根據這個得分，寫一段關於這首詩以及王維當時心境的【文學短評】。
    
    如果是 0 分（悲觀）：評論指出雖然詩句優美，但今日的王維似乎過於沈溺於離別的哀傷，少了幾分盛唐氣象與豁達。
    如果是 1 分（中等）：評論指出王維在感傷與豁達之間徘徊，最終還是送出了祝福，情感真摯。
    如果是 2 分（豁達）：評論高度讚賞今日的王維，認為他不僅寫出了離愁，更寫出了「勸君更盡一杯酒」的深情與對友人未來的堅定祝福，這正是這首詩能流傳千古的原因——哀而不傷，情深意重。

    要求：
    1. 語氣文雅、優美，帶有文學評論的深度。
    2. 字數控制在100字左右。
    3. 直接輸出評論內容，不要加引號或其他格式。
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "（評論家沈思良久，唯有一聲長嘆...）";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "（雲深不知處，評論暫缺。）";
  }
}