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

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}
