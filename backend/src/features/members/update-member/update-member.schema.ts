import z from "zod";

export const updateMemberSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .max(255, "Nome deve ter no máximo 255 caracteres"),
    email: z
      .string()
      .email("Email inválido")
      .max(255, "Email deve ter no máximo 255 caracteres"),

    phone: z.string().min(0, "Telefone inválido").max(11, "Telefone inválido"),
  }),
  params: z.object({
    id: z.coerce.number().int().positive("Id inválido"),
  }),
});
