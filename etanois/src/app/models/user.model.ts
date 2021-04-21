export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  phone_number?: string;
  cep?: string;
  role?: string;
  payment_mode?: string;
  password: string;
  new_password?: string;
  old_password?: string;
  search_distance_with_route?: number;
  search_distance_without_route?: number;
  etacoins?: number;
}
