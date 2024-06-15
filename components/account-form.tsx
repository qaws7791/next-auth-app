"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountFormState } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

interface AccountFormProps {
  action: (
    state: AccountFormState,
    formData: FormData
  ) => Promise<AccountFormState>;
}

export default function AccountForm({ action }: AccountFormProps) {
  const [state, formAction] = useFormState(action, undefined);

  return (
    <form action={formAction} className={cn("flex flex-col gap-4")}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="user@email.com"
          autoComplete="email"
          required
        />
        <p className="text-red-500 text-sm">
          {state?.errors?.email && state.errors.email.join(", ")}
        </p>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          autoComplete="current-password"
          required
        />
        <p className="text-red-500 text-sm">
          {state?.errors?.password && state.errors.password.join(", ")}
        </p>
      </div>
      <div>
        <p className="text-red-500 text-sm">{state?.message}</p>
      </div>
      <FormButton />
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "제출 중..." : "제출"}
    </Button>
  );
}
