import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string().min(3, "O número mínimo de caracteres é 3."),
    lastname: z.string().min(3, "O número mínimo de caracteres é 3."),
    gender: z.string().refine((field) => field !== "select", {
      message: "Você precisa escolher um gênero.",
    }),
    email: z
      .string()
      .min(1, "O campo é obrigatório.")
      .email("Utilize um email válido"),
    password: z.string().min(6, "O número mínimo de caracteres é 6."),
    confirmpassword: z.string().min(6, "O número mínimo de caracteres 6."),
    agree: z.boolean().refine((field) => field === true, {
      message: "Você precisa concordar com os termos",
    }),
  })
  .refine((field) => field.password === field.confirmpassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmpassword"],
  });

export type FormSchema = z.infer<typeof formSchema>;
