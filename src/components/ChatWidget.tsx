import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../types";

const RESPOSTAS: Record<string, string> = {
  "ver minhas missões":
    "Você tem 3 missões pendentes: 🚌 Use Transporte Público, ♻️ Recicle seu Lixo e 💡 Economize Energia. Quer iniciar alguma?",
  "quantos pontos tenho?": "Você tem 450 pontos acumulados! 🏆 Continue assim, está indo muito bem!",
  "dicas sustentáveis":
    "Aqui vão algumas dicas: 🌱 Prefira transporte público, ♻️ separe seu lixo, 💡 desligue as luzes ao sair e 🚿 tome banhos mais curtos!",
};

const SUGESTOES = ["Ver minhas missões", "Quantos pontos tenho?", "Dicas sustentáveis"];

let messageId = 0;
const nextId = () => `msg-${messageId++}`;

function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId(), from: "avatar", text: "Olá! Eu sou o Soul, seu avatar inteligente! 🌱 Como posso te ajudar hoje?" },
    { id: nextId(), from: "avatar", text: "Você tem 3 missões pendentes. Quer ver quais são?" },
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
        RESPOSTAS[text.toLowerCase()] ||
        "Entendi! Estou aqui para te ajudar a ser mais sustentável. 🌱 Tente perguntar sobre suas missões ou pontos!";
      setMessages((prev) => [...prev, { id: nextId(), from: "avatar", text: resposta }]);
    }, 800);
  }

  return (
    <div className="bg-bgSecondary border border-borderColor rounded-card overflow-hidden flex flex-col">
      <div className="bg-brandPrimary px-6 py-4 font-semibold text-sm">🐟 Soul — Avatar Inteligente</div>

      <div className="p-6 min-h-[250px] max-h-[300px] overflow-y-auto flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[80%] text-sm px-4 py-3 ${
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

      <div className="px-6 py-3 flex gap-2 flex-wrap border-t border-borderColor">
        {SUGESTOES.map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            className="bg-bgPrimary border border-brandPrimary text-brandSecondary rounded-pill px-4 py-1.5 text-xs transition-all hover:bg-brandPrimary hover:text-textPrimary"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="px-6 py-4 flex gap-3 border-t border-borderColor">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage(inputValue);
          }}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-bgPrimary border border-borderColor rounded-pill px-4 py-2 text-textPrimary text-sm focus:outline-none focus:border-brandPrimary"
        />
        <button
          onClick={() => sendMessage(inputValue)}
          className="bg-brandPrimary text-textPrimary rounded-pill px-5 py-2 font-semibold transition-colors hover:bg-brandSecondary"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default ChatWidget;
