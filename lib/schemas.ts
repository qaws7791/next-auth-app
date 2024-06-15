import { z } from "zod";

export const SignupFormSchema = z.object({
  email: z
    .string()
    .email({
      message: "유요한 이메일 주소를 입력해주세요.",
    })
    .trim(),
  password: z
    .string()
    .min(8, {
      message: "비밀번호는 최소 8자 이상이어야 합니다.",
    })
    .regex(/[a-zA-Z]/, {
      message: "비밀번호는 영문자를 포함해야 합니다.",
    })
    .regex(/[0-9]/, {
      message: "비밀번호는 숫자를 포함해야 합니다.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "비밀번호는 특수문자를 포함해야 합니다.",
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "유요한 이메일 주소를 입력해주세요.",
  }),
  password: z.string().min(8, {
    message: "비밀번호는 최소 8자 이상이어야 합니다.",
  }),
});

export const CommentFormSchema = z.object({
  comment: z.string().min(1, {
    message: "댓글을 입력해주세요.",
  }),
});

export const PaginationSchema = z.object({
  cursor: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
  userId: z.number().int().positive().optional(),
});
