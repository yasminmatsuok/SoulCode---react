import { useEffect, useRef, useState } from "react";
import type { ChatMessage, Saldo } from "../types";
import { formatarPontos } from "../utils/format";

// Respostas do Soul; pontos e nível vêm do saldo real do usuário
function montarRespostas(saldo: Saldo | null): Record<string, string> {
  const semSaldo = "Ainda estou carregando seu saldo. Tente de novo em instantes! ⏳";
  return {
    "ver minhas missões":
      "Algumas missões para você: 🚌 Use Transporte Público, ♻️ Recicle seu Lixo e 💡 Economize Energia. Veja todas na página Missões!",
    "quantos pontos tenho?": saldo
      ? `Você tem ${formatarPontos(saldo.pontosDisponiveis)} disponíveis para converter em recompensas! 🏆`
      : semSaldo,
    "dicas sustentáveis":
      "Aqui vão algumas dicas: 🌱 Prefira transporte público, ♻️ separe seu lixo, 💡 desligue as luzes ao sair e 🚿 tome banhos mais curtos!",
    "meu nível": saldo
      ? `Você está no Nível ${saldo.nivel.numero} - ${saldo.nivel.nome}! 🌟${
          saldo.nivel.faltamParaProximo ? ` Faltam ${formatarPontos(saldo.nivel.faltamParaProximo)} para subir.` : ""
        }`
      : semSaldo,
  };
}

const SUGESTOES = [
  "Ver minhas missões",
  "Quantos pontos tenho?",
  "Dicas sustentáveis",
  "Meu nível",
];

let messageId = 0;
const nextId = () => `msg-${messageId++}`;

interface ChatWidgetProps {
  saldo: Saldo | null;
}

function ChatWidget({ saldo }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nextId(),
      from: "avatar",
      text: "Olá! Eu sou o Soul, seu avatar inteligente! Como posso te ajudar hoje?",
    },
    {
      id: nextId(),
      from: "avatar",
      text: "Posso te mostrar seus pontos, seu nível ou sugerir missões. É só perguntar!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(text: string) {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { id: nextId(), from: "user", text }]);
    setInputValue("");

    setTimeout(() => {
      const resposta =
        montarRespostas(saldo)[text.trim().toLowerCase()] ||
        "Entendi! Estou aqui para te ajudar a ser mais sustentável. 🌱 Tente perguntar sobre suas missões ou pontos!";
      setMessages((prev) => [
        ...prev,
        { id: nextId(), from: "avatar", text: resposta },
      ]);
    }, 800);
  }

  return (
    <div className="bg-bgSecondary border border-borderColor rounded-card overflow-hidden flex flex-col">
      <div className="bg-brandPrimary px-4 sm:px-6 py-4 font-semibold text-sm">
        🐟 Soul — Avatar Inteligente
      </div>

      <div aria-live="polite" className="p-4 sm:p-6 min-h-[250px] max-h-[300px] md:max-h-[360px] overflow-y-auto flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[90%] sm:max-w-[80%] text-sm px-4 py-3 ${
              msg.from === "avatar"
                ? "bg-bgPrimary rounded-tr-xl rounded-br-xl rounded-bl-xl self-start"
                : "bg-brandPrimary rounded-tl-xl rounded-bl-xl rounded-br-xl self-end"
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 sm:px-6 py-3 flex gap-2 flex-wrap border-t border-borderColor">
        {SUGESTOES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => sendMessage(s)}
            className="bg-bgPrimary border border-brandPrimary text-brandSecondary rounded-pill px-4 py-1.5 text-xs transition-all hover:bg-brandPrimary hover:text-textPrimary"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="px-4 sm:px-6 py-4 flex gap-2 sm:gap-3 border-t border-borderColor">
        <label htmlFor="chat-mensagem" className="sr-only">
          Mensagem para o Soul
        </label>
        <input
          id="chat-mensagem"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage(inputValue);
          }}
          placeholder="Digite sua mensagem..."
          className="flex-1 min-w-0 bg-bgPrimary border border-borderColor rounded-pill px-4 py-2 text-textPrimary text-sm focus:outline-none focus:border-brandPrimary"
        />
        <button
          type="button"
          onClick={() => sendMessage(inputValue)}
          className="bg-brandPrimary text-textPrimary rounded-pill px-4 sm:px-5 py-2 font-semibold transition-colors hover:bg-brandSecondary"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default ChatWidget;