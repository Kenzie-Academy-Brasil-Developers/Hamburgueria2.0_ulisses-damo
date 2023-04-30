import { z } from "zod";

export const registerFormSchema = z
  .object({
    email: z
      .string()
      .min(1, "O e-mail é obrigatório")
      .email("Forneça um e-mail válido"),
    password: z
      .string()
      .min(8, "A senha precisa conter no mínimo 8 caracteres")
      .regex(/(?=.*?[a-z])/, "É necessário ao menos uma letra minúscula")
      .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número")
      .regex(/(\W|_)/, "Deve conter no mínimo 1 caracter especial."),
    name: z
      .string()
      .min(3, "Nome é obrigatório e precosa conter pelo menos 3 caracteress"),
    confirmPassword: z.string().min(1, "a confirmação de senha é obrigatória"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas precisam corresponder",
    path: ["confirmPassword"],
  });

export type TRegisterFormValues = z.infer<typeof registerFormSchema>;
