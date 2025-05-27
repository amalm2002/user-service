
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