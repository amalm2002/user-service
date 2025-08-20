
export interface UpdateAddressDto {
  userId: string;
  address: {
    city: string;
    pinCode: number;
    state: string;
    street: string;
  };
  index: number;
}

export interface UpdateAddressResponseDTO {
  message: string;
  address: {
    city: string;
    pinCode: number;
    state: string;
    street: string;
  }
}