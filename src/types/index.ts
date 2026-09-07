export type Difficulty = "facil" | "medio" | "dificil";

export interface Mission {
  id: string;
  icon: string;
  title: string;
  description: string;
  points: number;
  difficulty: Difficulty;
  longDescription: string;
}

export interface TeamMember {
  id: string;
  name: string;
  photo: string;
  rm: string;
  turma: string;
  role: string;
  github: string;
  linkedin: string;
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  from: "avatar" | "user";
  text: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
