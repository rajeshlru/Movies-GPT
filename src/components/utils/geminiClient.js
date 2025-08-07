import { GEMINI_API_KEY } from "./constants";

import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiClient = new GoogleGenerativeAI(GEMINI_API_KEY);
//console.log("Gemini API Key:", GEMINI_API_KEY);
export default geminiClient;
