
export interface CheckUserDto {
  email: string;
  name: string;
}

export interface CheckUserResponseDTO {
  token?: string;
  message: string;
}