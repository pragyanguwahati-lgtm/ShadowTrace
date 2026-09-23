import { db } from "./config";
import { collection, doc, setDoc } from "firebase/firestore";
import { Session } from "./schema";

export async function startSession(caseId: string, userId: string = "guest-user"): Promise<string> {
  const sessionId = `session-${Date.now()}`;
  try {
    if (db && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const sessionRef = doc(collection(db, "sessions"), sessionId);
      const newSession: Session = {
        id: sessionId,
        userId,
        caseId,
        status: "active",
        startedAt: Date.now(),
        discoveries: [],
        timeline: [
          {
            id: `evt-${Date.now()}`,
            timestamp: Date.now(),
            type: "note",
            title: "Investigation Started",
            description: "Operative accessed the case file.",
          }
        ]
      };
      await setDoc(sessionRef, newSession);
    }
  } catch (error) {
    console.warn("Firebase session write bypassed (offline mode):", error);
  }
  return sessionId;
}
