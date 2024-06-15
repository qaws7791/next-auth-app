export type AccountFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type CommentFormState =
  | {
      errors?: {
        comment?: string[];
      };
    }
  | undefined;

export type SessionPayload = {
  userId: number;
  expiresAt: Date;
};

export type Comments = {
  id: number;
  createdAt: Date;
  content: string;
  userId: number;
  updatedAt: Date;
  user: {
    email: string;
  };
}[];
