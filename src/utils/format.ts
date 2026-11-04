const numero = new Intl.NumberFormat("pt-BR");
const data = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" });

export const formatarPontos = (pontos: number) => `${numero.format(pontos)} pts`;

export const formatarData = (valor: Date) => data.format(valor);
