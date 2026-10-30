// Dados iniciais do mock, já no formato JSON que a API Java deve devolver.
import type { ConversaoApi, MissaoApi, RecompensaApi, SaldoApi } from "../types";

export const MISSOES_SEED: MissaoApi[] = [
  {
    id: 1,
    icone: "🚌",
    titulo: "Use Transporte Público",
    descricao: "Utilize o transporte público por 5 dias seguidos e registre suas viagens.",
    descricaoLonga:
      "Durante 5 dias seguidos, prefira o transporte público ao invés do carro particular. Registre cada viagem no app para comprovar o cumprimento da missão e ajudar a reduzir a emissão de carbono na cidade.",
    pontos: 50,
    dificuldade: "facil",
  },
  {
    id: 2,
    icone: "♻️",
    titulo: "Recicle seu Lixo",
    descricao: "Separe o lixo corretamente por uma semana e tire uma foto como prova.",
    descricaoLonga:
      "Separe corretamente os resíduos recicláveis, orgânicos e rejeitos por uma semana inteira. Ao final, tire uma foto do seu sistema de separação para comprovar a missão.",
    pontos: 30,
    dificuldade: "facil",
  },
  {
    id: 3,
    icone: "💡",
    titulo: "Economize Energia",
    descricao: "Reduza o consumo de energia em 20% comparado ao mês anterior.",
    descricaoLonga:
      "Compare sua conta de energia do mês atual com a do mês anterior e busque reduzir o consumo em pelo menos 20%, desligando aparelhos em stand-by e otimizando o uso de iluminação.",
    pontos: 80,
    dificuldade: "medio",
  },
  {
    id: 4,
    icone: "🌱",
    titulo: "Plante uma Muda",
    descricao: "Plante uma muda de árvore ou planta e documente o processo.",
    descricaoLonga:
      "Escolha uma muda de árvore ou planta nativa da sua região, plante em um espaço adequado e documente com fotos o processo de plantio e os primeiros dias de crescimento.",
    pontos: 100,
    dificuldade: "medio",
  },
  {
    id: 5,
    icone: "🚲",
    titulo: "30 Dias sem Carro",
    descricao: "Passe 30 dias utilizando apenas transporte público, bicicleta ou caminhada.",
    descricaoLonga:
      "Desafie-se a passar 30 dias sem usar o carro particular, priorizando transporte público, bicicleta ou caminhada para todos os seus deslocamentos.",
    pontos: 200,
    dificuldade: "dificil",
  },
  {
    id: 6,
    icone: "☀️",
    titulo: "Energia Solar",
    descricao: "Instale um painel solar ou utilize energia renovável por 30 dias.",
    descricaoLonga:
      "Instale um sistema de energia solar residencial ou contrate um plano de energia 100% renovável, mantendo o uso por pelo menos 30 dias consecutivos.",
    pontos: 300,
    dificuldade: "dificil",
  },
];

export const RECOMPENSAS_SEED: RecompensaApi[] = [
  {
    id: 1,
    nome: "10% de desconto na conta de luz",
    descricao: "Desconto aplicado na próxima fatura de energia elétrica junto à distribuidora parceira.",
    icone: "💡",
    categoria: "energia",
    custoPontos: 300,
    estoque: 20,
    ativa: true,
    criadaEm: "2026-09-01T10:00:00Z",
  },
  {
    id: 2,
    nome: "R$ 10 no Bilhete Único",
    descricao: "Crédito carregado direto no seu cartão de transporte público.",
    icone: "🚌",
    categoria: "transporte",
    custoPontos: 150,
    estoque: 50,
    ativa: true,
    criadaEm: "2026-09-03T14:30:00Z",
  },
  {
    id: 3,
    nome: "Cesta de orgânicos",
    descricao: "Cesta com frutas e verduras de produtores locais, entregue na sua casa.",
    icone: "🥗",
    categoria: "alimentacao",
    custoPontos: 400,
    estoque: 8,
    ativa: true,
    criadaEm: "2026-09-10T09:15:00Z",
  },
  {
    id: 4,
    nome: "Ingresso de cinema",
    descricao: "Um ingresso 2D válido em qualquer sessão da rede parceira, de segunda a quinta.",
    icone: "🎬",
    categoria: "cultura",
    custoPontos: 250,
    estoque: 15,
    ativa: true,
    criadaEm: "2026-09-12T18:00:00Z",
  },
  {
    id: 5,
    nome: "1 mês de bike compartilhada",
    descricao: "Plano mensal de bicicleta compartilhada com viagens ilimitadas de até 45 minutos.",
    icone: "🚲",
    categoria: "transporte",
    custoPontos: 500,
    estoque: 5,
    ativa: true,
    criadaEm: "2026-09-20T11:45:00Z",
  },
  {
    id: 6,
    nome: "Árvore plantada em seu nome",
    descricao: "Uma ONG parceira planta uma muda nativa e envia o certificado com a localização.",
    icone: "🌳",
    categoria: "parceiros",
    custoPontos: 50,
    estoque: 100,
    ativa: true,
    criadaEm: "2026-10-01T08:00:00Z",
  },
  {
    id: 7,
    nome: "Consultoria de energia solar",
    descricao: "Visita técnica para avaliar a instalação de painéis solares na sua residência.",
    icone: "☀️",
    categoria: "energia",
    custoPontos: 1200,
    estoque: 3,
    ativa: false,
    criadaEm: "2026-10-05T16:20:00Z",
  },
];

export const CONVERSOES_SEED: ConversaoApi[] = [
  {
    id: 1,
    usuarioId: 1,
    recompensaId: 2,
    recompensaNome: "R$ 10 no Bilhete Único",
    quantidade: 1,
    pontosGastos: 150,
    status: "aprovada",
    criadaEm: "2026-10-02T13:10:00Z",
  },
  {
    id: 2,
    usuarioId: 1,
    recompensaId: 6,
    recompensaNome: "Árvore plantada em seu nome",
    quantidade: 1,
    pontosGastos: 50,
    status: "pendente",
    criadaEm: "2026-10-20T09:40:00Z",
  },
  {
    id: 3,
    usuarioId: 1,
    recompensaId: 6,
    recompensaNome: "Árvore plantada em seu nome",
    quantidade: 2,
    pontosGastos: 100,
    status: "cancelada",
    criadaEm: "2026-10-22T17:05:00Z",
  },
];

// pontosConvertidos = soma das conversões que não foram canceladas (150 + 50)
export const SALDO_SEED: SaldoApi = {
  usuarioId: 1,
  pontosDisponiveis: 450,
  pontosAcumulados: 650,
  pontosConvertidos: 200,
};
