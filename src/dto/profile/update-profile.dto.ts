
export interface UpdateProfileDto {
  id: string;
  name: string;
  phone: string;
}

export interface UpdateProfileResponseDTO {
  message: string;
  isAdmin: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
    address: {
      city: string;
      pinCode: number;
      state: string;
      street: string;
    }[];
    isAdmin: boolean;
  }
}