"use server";
import { insertUser, existingUser, selectUserByEmail } from "@/drizzle/queries";
import { LoginFormSchema, SignupFormSchema } from "@/lib/schemas";
import { createSession, deleteSession } from "@/lib/session";
import { AccountFormState } from "@/lib/types";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function signup(
  state: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  // 1. FormData 유효성 검사
  const validatedData = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  // 2. 데이터 베이스에 저장하기 전 처리
  const { email, password } = validatedData.data;

  const existUser = await existingUser(email);

  if (existUser) {
    return {
      errors: { email: ["Email already exists"] },
    };
  }

  // 3. 데이터 베이스에 저장

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await insertUser({
    email: email,
    password: hashedPassword,
  });

  await createSession(data.id);
  redirect("/");
}

const LOGIN_ERROR_MESSAGE: AccountFormState = {
  message: "이메일 또는 비밀번호가 일치하지 않습니다.",
};

export async function login(
  state: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const validatedData = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedData.data;

  const user = await selectUserByEmail(email);

  if (!user) {
    return LOGIN_ERROR_MESSAGE;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return LOGIN_ERROR_MESSAGE;
  }

  await createSession(user.id);
  redirect("/");
}

export async function logout() {
  deleteSession();
  redirect("/");
}
