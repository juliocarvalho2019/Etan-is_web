import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuelStation } from './../../models/gas-station.model';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GasStationService } from './../../services/gas-station/gas-station.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fuel-station-edit',
  templateUrl: './fuel-station-edit.component.html',
  styleUrls: ['./fuel-station-edit.component.css']
})
export class FuelStationEditComponent implements OnInit {
  fuelStation: FuelStation;
  fuelStationGroup: FormGroup;

  @Input() title : string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FuelStationEditComponent>,
    private formBuilder: FormBuilder,
    private fuelStationService: GasStationService
  ) { }

  ngOnInit(): void {
    this.fuelStation = this.data.fuelStation;
    this.fuelStationGroup = this.formBuilder.group({
      name: [this.fuelStation.name, Validators.required],
      street: [this.fuelStation.street, Validators.required],
      street_number: [this.fuelStation.street_number, Validators.required],
      neighborhood: [this.fuelStation.neighborhood, Validators.required],
      // city: [this.fuelStation.city, Validators.required],
      // cep: [this.fuelStation.cep, Validators.required],
    });
  }

  // get name(): AbstractControl { return this.fuelStationGroup.get('name'); }
  // get street(): AbstractControl { return this.fuelStationGroup.get('street'); }
  // get street_number(): AbstractControl { return this.fuelStationGroup.get('street_number'); }
  // get neighborhood(): AbstractControl { return this.fuelStationGroup.get('neighborhood'); }

  confirmUpdate = (event: Event) => {
    event.preventDefault();
    const { name } = this.fuelStationGroup.value;
    const { street } = this.fuelStationGroup.value;
    const { street_number } = this.fuelStationGroup.value;
    const { neighborhood } = this.fuelStationGroup.value;
    // const { city } = this.fuelStationGroup.value;
    // const { cep } = this.fuelStationGroup.value;
    const updatedFuelStation: Partial<FuelStation> = { name, street, street_number, neighborhood };

    this.fuelStationService.update(this.fuelStation.id, updatedFuelStation)
      .then((res) => {
        console.log(res);
        this.closeDialog();
      })
      .catch((err: HttpErrorResponse) => {
        console.log('Erro ao editar posto de combustível', err);
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  cancel = () => {
    this.closeDialog();
  }

}
