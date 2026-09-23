import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { messages, caseDetails, cluesFound } = await req.json();

    const userMessage = messages[messages.length - 1]?.content || "Provide an investigation status report.";
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const systemPrompt = `You are ShadowTrace AI, a tactical cyber intelligence simulator assistant.
CURRENT CASE: ${caseDetails?.title || "The Phantom Protocol"}
MISSION BRIEFING: ${caseDetails?.briefingText || "Investigate the unauthorized breach into Section 4."}

DISCOVERED EVIDENCE:
${(cluesFound || []).map((c: any) => `- [${c.type.toUpperCase()}] ${c.title}: ${c.content}`).join("\n")}

STRICT INSTRUCTIONS:
1. NEVER reveal the culprit's identity directly. Prompt the operative to review specific evidence (e.g. server logs, IP addresses, proxy networks).
2. Answer questions accurately based on the case facts, server logs (IP 10.5.22.1, proxy 'The Silent Hand', 22:00 warehouse extraction).
3. Maintain a cinematic, professional operative tone (2-4 sentences max).
4. If asked what to do, give a clear, tactical hint about which clue to examine next.`;

    if (!apiKey) {
      const mockResponse = "ShadowTrace Neural Link: API key is not configured. Please verify your GEMINI_API_KEY in .env.local.";
      return new Response(mockResponse, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Prioritized list of active Gemini models
    const candidateModels = [
      "gemini-3.5-flash-lite",
      "gemini-3.6-flash",
      "gemini-flash-latest",
      "gemini-3.7-flash"
    ];

    let fullText = "";

    for (const model of candidateModels) {
      try {
        const stream = await ai.models.generateContentStream({
          model,
          contents: [
            ...history,
            { role: "user", parts: [{ text: `${systemPrompt}\n\nOperative Query: ${userMessage}` }] }
          ],
          config: {
            temperature: 0.3,
          }
        });

        const readable = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of stream) {
                if (chunk.text) {
                  controller.enqueue(new TextEncoder().encode(chunk.text));
                }
              }
              controller.close();
            } catch (err) {
              controller.error(err);
            }
          }
        });

        return new Response(readable, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
          }
        });
      } catch (err: any) {
        console.warn(`Model ${model} stream unavailable (${err?.status || err?.message}), attempting alternative...`);
      }
    }

    // Secondary fallback: Non-streaming generateContent
    for (const model of candidateModels) {
      try {
        const res = await ai.models.generateContent({
          model,
          contents: `${systemPrompt}\n\nOperative Query: ${userMessage}`
        });
        if (res.text) {
          fullText = res.text;
          break;
        }
      } catch (err) {
        console.warn(`Model ${model} generateContent unavailable:`, err);
      }
    }

    if (fullText) {
      return new Response(fullText, {
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }

    // In-character tactical fallback if all Google servers report high demand (503)
    const tacticalFallback = generateTacticalFallback(userMessage);
    return new Response(tacticalFallback, {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return new Response(
      "ShadowTrace AI: Neural buffer overloaded. Hint: Focus on the unauthorized POST request to /api/v1/auth from IP 10.5.22.1.",
      { headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }
}

function generateTacticalFallback(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("silent hand") || q.includes("who")) {
    return "ShadowTrace Intel: 'The Silent Hand' is an offshore syndication known for proxy-routing cyber intrusions. Cross-reference their relay server logs with the intercepted email regarding the 22:00 package extraction.";
  }
  if (q.includes("log") || q.includes("ip") || q.includes("server")) {
    return "ShadowTrace Intel: Notice the 401 unauthorized access at 13:55, followed immediately by an authenticated POST from IP 10.5.22.1. This indicates an internal credential compromise.";
  }
  if (q.includes("extract") || q.includes("meet") || q.includes("where") || q.includes("warehouse")) {
    return "ShadowTrace Intel: Visual surveillance indicates an abandoned industrial warehouse at the harbor front designated for the 22:00 exchange. Ensure all crypto drives are logged.";
  }
  if (q.includes("hint") || q.includes("step") || q.includes("what to do") || q.includes("help") || q.includes("objective")) {
    return "ShadowTrace Intel: Operative, your priority is to correlate the rogue IP 10.5.22.1 with the intercepted communications in Evidence Clue #3, then pinpoint the physical rendezvous point in Clue #4.";
  }
  return "ShadowTrace AI: Analysis in progress. Digital forensic markers confirm an external intrusion via an offshore relay. Examine the Server Access Logs and verify the intercepted email timestamps.";
}
