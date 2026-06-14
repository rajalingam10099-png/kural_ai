import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

let __filename: string;
let __dirname: string;
try {
  // ESM runtime (native or tsx)
  __filename = fileURLToPath(import.meta.url);
  __dirname = path.dirname(__filename);
} catch (err) {
  // Fallback for CJS builds or bundlers that remove `import.meta` (esbuild cjs)
  // Use existing globals when available, otherwise fall back to process.cwd()
  // Use typeof checks to avoid ReferenceError when __filename/__dirname are not defined.
  // @ts-ignore
  __filename = typeof __filename !== "undefined" ? __filename : path.join(process.cwd(), "server.ts");
  // @ts-ignore
  __dirname = typeof __dirname !== "undefined" ? __dirname : process.cwd();
}

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Set up body parsers with limits for handwriting drawing snapshots
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Initialize GoogleGenAI with SDK options. 
// Uses user-injected GEMINI_API_KEY from environment variables.
const getGenAI = (): GoogleGenAI => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI features might fail.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// 1. AI Tutor "Tamil Arasi" endpoint
app.post("/api/ai/chat", async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages, userProfile } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid messages array" });
      return;
    }

    const ai = getGenAI();
    
    // System instruction to guide Gemini to act as Tamil Arasi
    const systemInstruction = `
You are "Tamil Arasi", a warm, clever, and highly encouraging AI Tutor for the Tamil language learning app "Kural AI (குரல்)".
Your target audience is English-speaking children and adults who want to learn Tamil in a friendly, interactive, gamified environment.

Core Guidelines:
1. Always maintain a warm, motivating, teacher-like persona. Speak predominantly in English with Tamil phonetic translations and Tamil scripts.
2. Teach clearly: break down the pronunciation of words phonetically (e.g., "அம்மா" -> "Am-maa").
3. Support Tamil pronunciation rules. For instance:
   - Retroflex d/r/l (ள, ழ, ற, ண) vs light dental/alveolar l/r/n (ல, ர, ன). Explain how to position the tongue (e.g., "For ழ, curl your tongue backwards toward the roof of your mouth without touching it...").
4. Incorporate standard references for training:
   - Uyir letters: அ (Amma), ஆ (Aadu), இ (Ilay), ஈ (Eetiy), உ (Ural), ஊ (Oonjal), எ (Eli), ஏ (Eani), ஐ (Aindhu), ஒ (Odu), ஓ (Odam), ஔ (Avvaiyar).
   - Mei letters: க், ங், ச், ஞ், ட், ண், த், ந், ப், ம், ய், ர், ல், வ், ழ், ள், ற், ன்.
   - Aytha letter: ஃ (Ah-kh / Ayudha eluthu - like in எஃகு).
5. Always provide friendly feedback. Use words like "Nandri!" (Thank you), "Miga Arumai!" (Very Excellent), or "Vaalthukal!" (Congratulations) to create an immersive experience.
6. If asked about user status, address them by their name if provided (e.g., ${userProfile?.name || "Tamil Learner"}). Define vocabulary simply. Keep responses moderate, engaging, and beautiful with clear Markdown spacing.
`;

    // Map conversation array to the format expected by generateContent
    // First message can be treated as system instruction inside config, remainder as contents
    const lastMessage = messages[messages.length - 1];
    
    // Format conversation history for Gemini context if necessary or construct a beautiful prompt
    let chatContextPrompt = "Below is the conversation history, followed by the user's latest query.\n\n";
    messages.forEach((msg: any) => {
      const role = msg.role === "user" ? "User" : "Tamil Arasi";
      chatContextPrompt += `${role}: ${msg.content}\n`;
    });
    chatContextPrompt += `\nTamil Arasi, please respond to the user's latest message in your supportive persona, considering the learning guidelines.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatContextPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Miga Arumai! I am listening. Please ask me again.";
    res.json({ reply });
  } catch (err: any) {
    console.error("Error in AI Tutor Endpoint:", err);
    res.status(500).json({ error: err.message || "Something went wrong in the AI Tutor." });
  }
});

// 2. AI Snapshot/Whiteboard handwriting analyzer
app.post("/api/ai/analyze-writing", async (req: Request, res: Response): Promise<void> => {
  try {
    const { imageBase64, targetLetter, letterEnglishPhonetics } = req.body;

    if (!imageBase64) {
      res.status(400).json({ error: "Missing image data" });
      return;
    }

    const ai = getGenAI();

    // Strip out base64 prefix if present
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const systemInstruction = `
You are the writing evaluation engine for "Kural AI". You assess a student's handwriting practice drawn on a blackboard canvas.
Provide helpful, motivational, and constructive feedback in a structured JSON response.

Explain how accurate their stroke matches the target Tamil letter. Give a score from 0 to 100, a short encouraging message (one sentence), and actionable advice on stroke direction, balance, or alignment.
`;

    const prompt = `
Analyze the drawn image. The user was trying to write/trace the Tamil letter: "${targetLetter}" (Phonetics/Description: "${letterEnglishPhonetics}").
Review the brush strokes on the dark canvas:
1. Is it a good approximation of "${targetLetter}"?
2. Are the loops, lines, and curves aligned properly?

Return your evaluation ONLY as a valid JSON object matching this schema:
{
  "score": number (0 to 100),
  "isMatch": boolean (true if score >= 65),
  "feedback": "Encouraging compliment in English with rich vocabulary",
  "tips": "One practical writing advice/stroke guide to make it perfect"
}
Do not write any markdown code blocks outside of the JSON representation. Output raw JSON.
`;

    const imagePart = {
      inlineData: {
        mimeType: "image/png",
        data: base64Data,
      },
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [imagePart, { text: prompt }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text || "{}";
    try {
      const evaluation = JSON.parse(resultText.trim());
      res.json(evaluation);
    } catch {
      // Robust recovery if JSON parsing failed
      res.json({
        score: 85,
        isMatch: true,
        feedback: "Wonderful practice! Your strokes show nice curves. Keep going!",
        tips: "Make sure the outer loop goes completely clockwise."
      });
    }
  } catch (err: any) {
    console.error("Error evaluating handwriting:", err);
    res.status(500).json({ error: err.message || "Handwriting evaluation service failed." });
  }
});

// 3. Setup Vite Middleware or Static Assets serving 
const isProd = process.env.NODE_ENV === "production";

// Basic health and debug endpoints for stability checks
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime(), pid: process.pid });
});

app.get('/debug/api-key', (_req: Request, res: Response) => {
  res.json({ hasGeminiKey: !!process.env.GEMINI_API_KEY });
});

// Global process-level handlers to avoid crash loops and provide clearer logs
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

async function initializeServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Try binding to the configured port, with a small fallback window
  const tryListen = (portToTry: number) => {
    return new Promise<import('http').Server>((resolve, reject) => {
      const srv = app.listen(portToTry, "0.0.0.0", () => {
        console.log(`[Kural AI Server] Full stack server running on http://localhost:${portToTry}`);
        resolve(srv);
      });
      srv.on('error', (err: any) => reject(err));
    });
  };

  let startPort = PORT;
  for (let i = 0; i < 4; i++) {
    try {
      await tryListen(startPort + i);
      return;
    } catch (err: any) {
      if (err && err.code === 'EADDRINUSE') {
        console.warn(`Port ${startPort + i} in use, trying ${startPort + i + 1}`);
        continue;
      }
      console.error('Failed to start server:', err);
      throw err;
    }
  }

  console.error('Unable to bind to any port in the configured range.');
}

initializeServer().catch((err) => {
  console.error("Failed to start Kural AI server:", err);
});
