import { Fuel } from './fuel.model';
import { GasStationServices } from './services.model';
export interface FuelStation {
  id?: number;
  name: string;
  cnpj: string;
  street: string;
  street_number: string;
  neighborhood: string;
  cep: string;
  time_to_open: string;
  time_to_close: string;
  flag_of_fuel_station?: string;
  // city: string;
  // address: string;
  // email: string;
  phone_number: string;
  // payment_card: number;
  // password: string;
  // openning_hours: string;
  restaurant?: boolean;
  car_wash?: boolean;
  mechanical?: boolean;
  available_fuels?: Fuel[];
  available_services?: GasStationServices[];
}
