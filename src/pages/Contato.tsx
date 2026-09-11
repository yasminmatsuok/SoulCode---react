import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ContactFormData } from "../types";

const INFO_ITEMS = [
  { icon: "📧", title: "E-mail", text: "soulcode@fiap.com.br" },
  { icon: "📍", title: "Localização", text: "FIAP — Paulista, São Paulo" },
  { icon: "🎓", title: "Curso", text: "Análise e Desenvolvimento de Sistemas" },
  { icon: "📅", title: "Turma", text: "1TDS — Fevereiro 2026" },
];

function Contato() {
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = () => {
    setShowSuccess(true);
    reset();
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-bgPrimary border rounded-lg px-4 py-3 text-textPrimary focus:outline-none transition-colors ${
      hasError ? "border-red-400" : "border-borderColor focus:border-brandPrimary"
    }`;

  return (
    <main>
      <section
        className="min-h-[40vh] flex items-center justify-center text-center px-8 pt-32 pb-16"
        style={{ background: "radial-gradient(ellipse at center, #1a1535 0%, #0A0A0F 70%)" }}
      >
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Entre em <span className="highlight">Contato</span>
          </h1>
          <p className="text-textSecondary text-lg">Tem alguma dúvida ou sugestão? Fale com a gente!</p>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="container-app grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Envie uma <span className="highlight">Mensagem</span>
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm text-textSecondary">
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  className={inputClass(!!errors.name)}
                  {...register("name", { required: "Por favor, insira seu nome." })}
                />
                {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name.message}</span>}
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-textSecondary">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className={inputClass(!!errors.email)}
                  {...register("email", {
                    required: "Por favor, insira um e-mail válido.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Por favor, insira um e-mail válido.",
                    },
                  })}
                />
                {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 text-sm text-textSecondary">
                  Assunto
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Assunto da mensagem"
                  className={inputClass(!!errors.subject)}
                  {...register("subject", { required: "Por favor, informe o assunto." })}
                />
                {errors.subject && <span className="text-red-400 text-xs mt-1 block">{errors.subject.message}</span>}
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm text-textSecondary">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Escreva sua mensagem aqui..."
                  className={inputClass(!!errors.message)}
                  {...register("message", { required: "Por favor, escreva sua mensagem." })}
                />
                {errors.message && <span className="text-red-400 text-xs mt-1 block">{errors.message.message}</span>}
              </div>

              <button type="submit" className="btn-primary">
                Enviar Mensagem
              </button>

              {showSuccess && (
                <div className="text-green-400 text-sm mt-2">✅ Mensagem enviada com sucesso!</div>
              )}
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">
              Nossas <span className="highlight">Informações</span>
            </h2>
            <div className="flex flex-col gap-6">
              {INFO_ITEMS.map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-textSecondary text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contato;
