export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: number;
  lastLoginAt: number;
}

export interface Case {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: number; // in minutes
  coverImage: string;
  briefingText: string;
}

export interface Clue {
  id: string;
  caseId: string;
  title: string;
  type: "document" | "image" | "email" | "log" | "audio";
  content: string; // Text or URL
  unlockedBy: string[]; // Clue IDs that must be found first
  isKeyDiscovery: boolean; // Triggers the gold accent and cinematic reveal
}

export interface TimelineEvent {
  id: string;
  timestamp: number;
  type: "discovery" | "ai_insight" | "note";
  title: string;
  description: string;
  clueId?: string;
}

export interface Session {
  id: string;
  userId: string;
  caseId: string;
  status: "active" | "completed";
  startedAt: number;
  completedAt?: number;
  discoveries: string[]; // Array of discovered Clue IDs
  timeline: TimelineEvent[];
}

export interface Report {
  id: string;
  sessionId: string;
  userId: string;
  caseId: string;
  pdfUrl?: string; // If stored in Storage
  generatedAt: number;
  summary: string; // AI generated summary of the investigation
}
