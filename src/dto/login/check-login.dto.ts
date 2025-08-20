
export interface CheckLoginDto {
  email: string;
  password: string;
}

export interface CheckLoginResponseDTO {
  message: string;
  name?: string;
  token?: string;
  refreshToken?: string;
  isAdmin?: boolean;
  isActive?: boolean;
  _id?: string;
  role?: string
}