import { useForm, type SubmitHandler } from "react-hook-form";
import FormField from "../components/FormField";
import PageHero from "../components/PageHero";
import { useNotification } from "../hooks/useNotification";
import type { ContactFormData } from "../types";
import { inputClass } from "../utils/formStyles";

const INFO_ITEMS = [
  { icon: "📧", title: "E-mail", text: "contato.soulcode@fiap.com.br" },
  { icon: "📍", title: "Localização", text: "FIAP — Paulista, São Paulo" },
  { icon: "🎓", title: "Curso", text: "Análise e Desenvolvimento de Sistemas" },
  { icon: "📅", title: "Turma", text: "1TDS — Fevereiro 2026" },
];

function Contato() {
  const { notificar } = useNotification();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  // O formulário de contato não faz parte da API: apenas confirma o envio para o usuário
  const onSubmit: SubmitHandler<ContactFormData> = ({ name }) => {
    notificar("success", `Obrigado, ${name.split(" ")[0]}! Sua mensagem foi enviada.`);
    reset();
  };

  return (
    <main>
      <PageHero
        titulo={
          <>
            Entre em <span className="highlight">Contato</span>
          </>
        }
        subtitulo="Tem alguma dúvida ou sugestão? Fale com a gente!"
      />

      <section className="py-14 md:py-20">
        <div className="container-app grid md:grid-cols-2 gap-10 lg:gap-12">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              Envie uma <span className="highlight">Mensagem</span>
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
              <FormField id="name" label="Nome completo" error={errors.name?.message}>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  aria-invalid={!!errors.name}
                  className={inputClass(!!errors.name)}
                  {...register("name", {
                    required: "Por favor, insira seu nome completo.",
                    minLength: { value: 3, message: "O nome precisa ter pelo menos 3 caracteres." },
                  })}
                />
              </FormField>

              <FormField id="email" label="E-mail" error={errors.email?.message}>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  aria-invalid={!!errors.email}
                  className={inputClass(!!errors.email)}
                  {...register("email", {
                    required: "Por favor, insira um e-mail válido.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Por favor, insira um e-mail válido.",
                    },
                  })}
                />
              </FormField>

              <FormField id="subject" label="Assunto" error={errors.subject?.message}>
                <input
                  id="subject"
                  type="text"
                  placeholder="Assunto da mensagem"
                  aria-invalid={!!errors.subject}
                  className={inputClass(!!errors.subject)}
                  {...register("subject", { required: "Por favor, insira o assunto da sua mensagem." })}
                />
              </FormField>

              <FormField id="message" label="Mensagem" error={errors.message?.message}>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Escreva sua mensagem aqui..."
                  aria-invalid={!!errors.message}
                  className={inputClass(!!errors.message)}
                  {...register("message", {
                    required: "Por favor, escreva sua mensagem.",
                    minLength: { value: 10, message: "A mensagem precisa ter pelo menos 10 caracteres." },
                  })}
                />
              </FormField>

              <button type="submit" className="btn-primary self-start">
                Enviar Mensagem
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              Nossas <span className="highlight">Informações</span>
            </h2>
            <ul className="flex flex-col gap-6 list-none">
              {INFO_ITEMS.map((item) => (
                <li key={item.title} className="flex gap-4 items-start">
                  <span className="text-2xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-textSecondary text-sm break-words">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contato;
