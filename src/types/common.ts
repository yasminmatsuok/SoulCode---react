// Identificador numérico gerado pela API (Long no Java)
export type Id = number;

// Union Type: estados de qualquer tela que consome dados
export type Status = "loading" | "success" | "error" | "empty";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Formato de erro que a API pode devolver no corpo (400, 404, 500...)
export interface ApiErrorBody {
  mensagem?: string;
  erro?: string; // formato usado pela API Spring Boot
  message?: string;
}
