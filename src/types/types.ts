export type CreateUserAccount = {
  id?: string
  email: string;
  password: string;
  name: string;
};

export type LoginUserAccount = {
  email: string;
  password: string;
};
