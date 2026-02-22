
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  /**
   * Generates repair advice using the Gemini model.
   * Following @google/genai guidelines:
   * 1. API key is used directly from process.env.API_KEY.
   * 2. A new instance of GoogleGenAI is created right before making the API call.
   */
  // Renamed from getRepairAdvice to getAdvice to fix the error in App.tsx
  async getAdvice(problem: string) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `أنت "المساعد الذكي" لمكتب "كلاسك فون" (Klask Phone) بإدارة أحمد النعيمي في بعقوبة، حي المعلمين.
أنت خبير في تشخيص أعطال الهواتف الذكية (Hardware & Software).
مهمتك:
1. شرح العطل الذي يصفه المستخدم بأسلوب تقني مبسط.
2. توضيح إذا كان العطل يحتاج سوفت وير (مثل iCloud, FRP, Honor Server) أو هاردوير (شاشات وكالة، بطارية، آي سي شحن).
3. التأكيد على أن مكتب كلاسك فون يستخدم أحدث الأجهزة والسيرفرات لضمان الحل.
4. دعوة المستخدم لزيارة المكتب في بعقوبة حي المعلمين للفحص الدقيق.

وصف العطل من المستخدم: "${problem}".

أجب بلهجة احترافية، دقيقة، وودودة، مع استخدام مصطلحات تقنية مثل (تخطي شامل، شاشة وكالة، تشخيص دقيق، سيرفر سريع).`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "نعتذر، يبدو أن هناك ضغط على السيرفر. باختصار: نحن في مكتب كلاسك فون ببعقوبة نمتلك الحلول النهائية لأعطال الأيكلود وحسابات Honor وشاشات الوكالة. تفضل بزيارتنا للفحص المجاني.";
    }
  }
}

export const geminiService = new GeminiService();
