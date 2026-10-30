import type { Mission } from "../types";

export const missions: Mission[] = [
  {
    id: "transporte-publico",
    icon: "🚌",
    title: "Use Transporte Público",
    description:
      "Utilize o transporte público por 5 dias seguidos e registre suas viagens.",
    points: 50,
    difficulty: "facil",
    longDescription:
      "Durante 5 dias seguidos, prefira o transporte público ao invés do carro particular. Registre cada viagem no app para comprovar o cumprimento da missão e ajudar a reduzir a emissão de carbono na cidade.",
  },
  {
    id: "reciclagem",
    icon: "♻️",
    title: "Recicle seu Lixo",
    description:
      "Separe o lixo corretamente por uma semana e tire uma foto como prova.",
    points: 30,
    difficulty: "facil",
    longDescription:
      "Separe corretamente os resíduos recicláveis, orgânicos e rejeitos por uma semana inteira. Ao final, tire uma foto do seu sistema de separação para comprovar a missão.",
  },
  {
    id: "economia-energia",
    icon: "💡",
    title: "Economize Energia",
    description:
      "Reduza o consumo de energia em 20% comparado ao mês anterior.",
    points: 80,
    difficulty: "medio",
    longDescription:
      "Compare sua conta de energia do mês atual com a do mês anterior e busque reduzir o consumo em pelo menos 20%, desligando aparelhos em stand-by e otimizando o uso de iluminação.",
  },
  {
    id: "plantar-muda",
    icon: "🌱",
    title: "Plante uma Muda",
    description:
      "Plante uma muda de árvore ou planta e documente o processo.",
    points: 100,
    difficulty: "medio",
    longDescription:
      "Escolha uma muda de árvore ou planta nativa da sua região, plante em um espaço adequado e documente com fotos o processo de plantio e os primeiros dias de crescimento.",
  },
  {
    id: "sem-carro",
    icon: "🚲",
    title: "30 Dias sem Carro",
    description:
      "Passe 30 dias utilizando apenas transporte público, bicicleta ou caminhada.",
    points: 200,
    difficulty: "dificil",
    longDescription:
      "Desafie-se a passar 30 dias sem usar o carro particular, priorizando transporte público, bicicleta ou caminhada para todos os seus deslocamentos.",
  },
  {
    id: "energia-solar",
    icon: "☀️",
    title: "Energia Solar",
    description:
      "Instale um painel solar ou utilize energia renovável por 30 dias.",
    points: 300,
    difficulty: "dificil",
    longDescription:
      "Instale um sistema de energia solar residencial ou contrate um plano de energia 100% renovável, mantendo o uso por pelo menos 30 dias consecutivos.",
  },
];