import { BASE_URL } from './../../utils/constants';
import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Fuel } from '../../models/fuel.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  fuelGetPath = 'fuel/';

  @Input()
  public fuelsToSelect: { name: string }[];

  @Output()
  public fuelsToSelectChange: EventEmitter<{ name: string }[]> = new EventEmitter<{ name: string }[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getFuelSelectList = async () => {
    return await this.http.get(BASE_URL + this.fuelGetPath, { headers: this.authService.getHeaders() })
      .toPromise()
      .then((res: { payload: [{ name: string }] }) => {
        this.fuelsToSelect = res.payload;
        return this.fuelsToSelect;
      })
      .catch((err: HttpErrorResponse) => {
        throw err;
      });
  }

}
