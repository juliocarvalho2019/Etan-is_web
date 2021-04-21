import { FuelNames } from './../../utils/constants';
import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { FuelStation } from './../../models/gas-station.model';
import { BASE_URL } from '../../utils/constants';
import { Fuel } from '../../models/fuel.model';
import { GasStationServices } from '../../models/services.model';

@Injectable({
  providedIn: 'root'
})
export class GasStationService {
  private gasStationGetPath = 'fuel_station/';
  private gasStationGetUserPath = 'fuel_station/read-by-user/1';
  private gasStationCreatePath = 'fuel_station/new';
  private gasStationUpdatePath = 'fuel_station/update/';
  private AVAILABLE_FUEL_URL = '/available-fuel';
  private AVAILABLE_SERVICES_URL = '/available-service';
  private GET_AVAILABLE_SERVICES_URL = 'fuel_station/read-all-available-services';
  private FLAGS_URL = 'fuel_station/read-all-flags';
  postGetPath = 'fuelStation/';
  private gasStationService: GasStationService;

  @Input()
  public fuelStation: FuelStation;

  @Output()
  public fuelStationChange: EventEmitter<FuelStation> = new EventEmitter<FuelStation>();

  @Input()
  public currentGasStation: FuelStation;

  @Output()
  public currentGasStationChange: EventEmitter<FuelStation> = new EventEmitter<FuelStation>();

  @Input()
  public gasStations: FuelStation[] = [];

  @Output()
  public gasStationsChange: EventEmitter<FuelStation[]> = new EventEmitter<FuelStation[]>();

  @Input()
  public gasStationsFlags: string[] = [];

  @Output()
  public gasStationsFlagsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Input()
  public availableGasStationServices: GasStationServices[] = [];

  @Output()
  public availableGasStationServicesChange: EventEmitter<GasStationServices[]> = new EventEmitter<GasStationServices[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
  getFuelStation = (): FuelStation => {
    return this.fuelStation;
  }

  setFuelStation = (gasStation: FuelStation) => {
    this.fuelStation = gasStation;
    this.fuelStationChange.emit(this.fuelStation);
  }

  getCurrentGasStation = (): FuelStation => {
    return this.currentGasStation;
  }

  setCurrentGasStation = (gasStation: FuelStation) => {
    this.currentGasStation = gasStation;
    this.currentGasStationChange.emit(this.currentGasStation);
  }

  clearCurrentGasStation = () => {
    this.currentGasStation = undefined;
    this.currentGasStationChange.emit(this.currentGasStation);
  }

  getGasStations = (): FuelStation[] => {
    return this.gasStations;
  }

  setGasStations = (gasStation: FuelStation[]) => {
    this.gasStations = gasStation;
    this.gasStationsChange.emit(this.gasStations);
  }

  getFlags = (): string[] => {
    return this.gasStationsFlags;
  }

  setFlags = (gasStationFlags: string[]) => {
    this.gasStationsFlags = gasStationFlags;
    this.gasStationsFlagsChange.emit(this.gasStationsFlags);
  }

  clearGasStation = () => {
    this.currentGasStation = undefined;
    this.gasStations = [];
    this.gasStationsChange.emit(this.gasStations);
    this.currentGasStationChange.emit(this.currentGasStation);
  }

  getGasStationsByUserId = async () => {
    return await this.http.get(BASE_URL + this.gasStationGetUserPath, { headers: this.authService.getHeaders() })
      .toPromise()
      .then((res: { payload: { count: number, fuel_stations: FuelStation[] } }) => {
        console.log(res);
        this.setGasStations(res.payload.fuel_stations);
        return res.payload;
      })
      .catch((err) => {
        throw err;
      });
  }

  getGasStationsFlags = async () => {
    return await this.http.get(BASE_URL + this.FLAGS_URL, { headers: this.authService.getHeaders() })
      .toPromise()
      .then((res: { payload: { flags: string[] } }) => {
        this.setFlags(res.payload.flags);
        return res.payload.flags;
      })
      .catch((err) => {
        throw err;
      });
  }

  saveAvailableFuels = async (fuel: string, price: number) => {
    const newAvailableFuels = {
      available_fuels: [
        ...this.currentGasStation.available_fuels.filter((value) => value.fuel !== fuel),
        {
          fuel,
          price,
        }]
    };
    return await this.http.post(
      BASE_URL + this.gasStationGetPath + this.currentGasStation.id + this.AVAILABLE_FUEL_URL,
      newAvailableFuels,
      { headers: this.authService.getHeaders() }
    )
      .toPromise()
      .then((res: { payload: { available_fuels: Fuel[] } }) => {
        console.log(res.payload.available_fuels);
        this.currentGasStation.available_fuels = res.payload.available_fuels;
        this.currentGasStationChange.emit(this.currentGasStation);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  deleteAvailableFuels = async (fuel: string) => {
    const newAvailableFuels = {
      available_fuels: [...this.currentGasStation.available_fuels.filter((value) => value.fuel !== fuel)]
    };
    return await this.http.post(
      BASE_URL + this.gasStationGetPath + this.currentGasStation.id + this.AVAILABLE_FUEL_URL,
      newAvailableFuels,
      { headers: this.authService.getHeaders() }
    )
      .toPromise()
      .then((res: { payload: { available_fuels: Fuel[] } }) => {
        this.currentGasStation.available_fuels = res.payload.available_fuels;
        this.currentGasStationChange.emit(this.currentGasStation);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  saveAvailableService = async (serviceType: string, openTime: string, closeTime: string, service24: boolean) => {
    const newAvailableService = {
      available_services: [
        ...this.currentGasStation.available_services.filter((value) => value.service_type !== serviceType),
        {
          service_type: serviceType,
          time_to_close: closeTime,
          time_to_open: openTime,
          service_24_hours: service24
        }]
    };
    return await this.http.post(
      BASE_URL + this.gasStationGetPath + this.currentGasStation.id + this.AVAILABLE_SERVICES_URL,
      newAvailableService,
      { headers: this.authService.getHeaders() }
    )
      .toPromise()
      .then((res: { payload: { available_services: GasStationServices[] } }) => {
        this.currentGasStation.available_services = res.payload.available_services;
        this.currentGasStationChange.emit(this.currentGasStation);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
  public clearFuelStation = () => {
    this.gasStationService.clearGasStation();
    this.gasStations = undefined;
    this.gasStationsChange.emit(this.gasStations);
  }

  deleteAvailableService = async (serviceType: string) => {
    const newAvailableService = {
      available_services: [...this.currentGasStation.available_services.filter((value) => value.service_type !== serviceType)]
    };
    return await this.http.post(
      BASE_URL + this.gasStationGetPath + this.currentGasStation.id + this.AVAILABLE_SERVICES_URL,
      newAvailableService,
      { headers: this.authService.getHeaders() }
    )
      .toPromise()
      .then((res: { payload: { available_services: GasStationServices[] } }) => {
        this.currentGasStation.available_services = res.payload.available_services;
        this.currentGasStationChange.emit(this.currentGasStation);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  getAvailableServices = async (): Promise<any> => {
    return await this.http.get(BASE_URL + this.GET_AVAILABLE_SERVICES_URL, { headers: this.authService.getHeaders() })
      .toPromise()
      .then((res: { payload: { available_services: string[] } }) => {
        return res.payload.available_services;
      })
      .catch((err) => {
        throw err;
      });
  }

  create = async (gasStation: FuelStation) => {
    return await this.http.post(BASE_URL + this.gasStationCreatePath, gasStation, { headers: this.authService.getHeaders() })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  public update = async (gasStationId, gasStations: Partial<FuelStation>) => {
    return await this.http.put(BASE_URL + this.gasStationUpdatePath + gasStationId, gasStations, { headers: this.authService.getHeaders() })
      .toPromise()
      .then((res) => {
        this.getGasStationsByUserId();
      })
      .catch((err) => {
        throw err;
      });
  }
  public delete = async (gasStationId: number) => {
    return await this.http.delete(BASE_URL + this.postGetPath + gasStationId, { headers: this.authService.getHeaders() })
      .toPromise()
      .then((res) => {
        this.clearFuelStation();
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
  // getAllGasStations = async (userId: number) => {
  //   return await this.http.get(BASE_URL + this.gasStationPath + userId, { headers: this.authService.getHeaders() })
  //     .toPromise()
  //     .then((gasStation: FuelStation) => {
  //       this.setGasStation(gasStation);
  //       return gasStation;
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // }
}

