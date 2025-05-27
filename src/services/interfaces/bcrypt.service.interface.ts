
export interface IBcryptService {
  securePassword(password: string): Promise<string>;
  matchPassword(passwordOne: string, passwordTwo: string): Promise<boolean>;
}