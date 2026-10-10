import type { EntityId, Mission, MissionDetail, MissionInput } from "../types";
import { request } from "./api";

// Ajuste este caminho se o endpoint da API Java for diferente (ex.: "/api/missoes")
const RESOURCE = "/missoes";

export const listMissions = () => request<Mission[]>(RESOURCE);

export const getMission = (id: EntityId) =>
  request<MissionDetail>(`${RESOURCE}/${id}`);

export const createMission = (data: MissionInput) =>
  request<Mission>(RESOURCE, { method: "POST", body: JSON.stringify(data) });

export const updateMission = (id: EntityId, data: MissionInput) =>
  request<Mission>(`${RESOURCE}/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteMission = (id: EntityId) =>
  request<void>(`${RESOURCE}/${id}`, { method: "DELETE" });
