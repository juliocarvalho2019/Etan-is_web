import { GasStationService } from './../../services/gas-station/gas-station.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Fuel } from './../../models/fuel.model';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuelService } from '../../services/fuel/fuel.service';
import { FuelNames } from '../../utils/constants';

@Component({
  selector: 'app-fuel-add-edit',
  templateUrl: './fuel-add-edit.component.html',
  styleUrls: ['./fuel-add-edit.component.css']
})
export class FuelAddEditComponent implements OnInit {
  fuelGroup: FormGroup;
  fuelsToSelect: { name: string }[];
  fuel: Fuel;
  // title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FuelAddEditComponent>,
    private formBuilder: FormBuilder,
    private gasStationService: GasStationService,
    public fuelService: FuelService,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.fuel = this.data.fuel;
      this.fuelGroup = this.formBuilder.group({
        fuel: [this.getFuelValueByName(this.fuel?.fuel).toString(), Validators.required],
        price: [this.fuel?.price, Validators.required]
      });
      // this.title = this.data.title;
    } else {
      this.fuelGroup = this.formBuilder.group({
        fuel: ['', Validators.required],
        price: ['0.00', Validators.required]
      });
      // this.title = this.data.title;
    }

    this.fuelService.getFuelSelectList()
      .then((fuels) => {
        this.fuelsToSelect = fuels;
      });
  }

  getFuelValueByName = (fuelName: string): number => {
    switch (fuelName) {
      case 'Gasolina Comum': return FuelNames.NORMAL_GAS;
      case 'Gasolina Aditivada': return FuelNames.PREMIUM_GAS;
      case 'Etanol': return FuelNames.ETHANOL;
    }
  }

  getFuelNameByEnumValue = (value: string): string => {
    switch (parseInt(value, 10)) {
      case FuelNames.NORMAL_GAS: return 'Gasolina Comum';
      case FuelNames.PREMIUM_GAS: return 'Gasolina Aditivada';
      case FuelNames.ETHANOL: return 'Etanol';
    }
  }

  createFuel = (event: Event) => {
    event.preventDefault();
    if (!this.fuelGroup.valid) { return; }
    const { fuel, price } = this.fuelGroup.value;
    this.gasStationService.saveAvailableFuels(this.getFuelNameByEnumValue(fuel), price)
      .then((res) => {
        console.log(res);
        this.dialogRef.close();
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  updateFuel = (event: Event) => {
    event.preventDefault();
    if (!this.fuelGroup.valid) { return; }
    const { fuel, price } = this.fuelGroup.value;
    this.gasStationService.saveAvailableFuels(this.getFuelNameByEnumValue(fuel), price)
      .then((res) => {
        console.log(res);
        this.dialogRef.close();
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  closeDialog = () => {
    this.dialogRef.close();
  }

  cancel = () => {
    this.closeDialog();
  }

}
