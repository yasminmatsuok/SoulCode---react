export type Difficulty = "facil" | "medio" | "dificil";

// Union Type: o back-end Java pode devolver o id como número (Long) ou texto
export type EntityId = number | string;

export interface Mission {
  id: EntityId;
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

// Dados enviados ao criar/editar uma missão (a API é quem gera o id)
export type MissionInput = Omit<Mission, "id">;

// Intersection Type: missão + metadados opcionais que a API pode devolver
export type ApiMeta = { createdAt?: string; updatedAt?: string };
export type MissionDetail = Mission & ApiMeta;

// Estado de uma requisição (Union Type de estados)
export type RequestStatus = "loading" | "success" | "error";
