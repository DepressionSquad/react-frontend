export type Role = "ADMIN" | "HRMANAGER" | "USER";

type UserBase = {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  address?: string;
  phoneNumber?: string;
};

export type UserRegister = UserBase & {
  password: string;
  passwordAgain: string;
};

export type UserLogin = Pick<UserRegister, "email" | "password">;

export type User = UserBase & {
  id: string;
  role: Role;
};
