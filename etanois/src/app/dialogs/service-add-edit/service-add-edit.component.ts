import { GasStationServices } from './../../models/services.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GasStationService } from '../../services/gas-station/gas-station.service';

@Component({
  selector: 'app-service-add-edit',
  templateUrl: './service-add-edit.component.html',
  styleUrls: ['./service-add-edit.component.css']
})
export class ServiceAddEditComponent implements OnInit {
  public currentService: GasStationServices = undefined;
  public serviceGroup: FormGroup;
  public servicesToSelect: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ServiceAddEditComponent>,
    private formBuilder: FormBuilder,
    private gasStationService: GasStationService
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.currentService = this.data.service;
      this.serviceGroup = this.formBuilder.group({
        type: [this.currentService?.service_type, Validators.required],
        service24: [this.currentService?.service_24_hours, Validators.required],
        openTime: [this.currentService?.time_to_open, Validators.required],
        closeTime: [this.currentService?.time_to_close, Validators.required]
      });
    } else {
      this.serviceGroup = this.formBuilder.group({
        type: ['restaurant', Validators.required],
        service24: [false, Validators.required],
        openTime: ['00:00:00', Validators.required],
        closeTime: ['00:00:00', Validators.required]
      });
    }

    this.gasStationService.getAvailableServices()
      .then((services) => {
        this.servicesToSelect = services;
      });
  }

  createService = (event: Event) => {
    event.preventDefault();
    if (!this.serviceGroup.valid) { return; }
    const { type, service24, openTime, closeTime } = this.serviceGroup.value;
    console.log(type, openTime, closeTime, service24);
    this.gasStationService.saveAvailableService(type, openTime, closeTime, service24)
      .then((res) => {
        console.log(res);
        this.dialogRef.close();
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  updateService = (event: Event) => {
    event.preventDefault();
    if (!this.serviceGroup.valid) { return; }
    const { type, service24, openTime, closeTime } = this.serviceGroup.value;
    this.gasStationService.saveAvailableService(type, openTime, closeTime, service24)
      .then((res) => {
        console.log(res);
        this.dialogRef.close();
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  changeService24Status = (event: boolean) => {
    this.serviceGroup.value.service24 = event;
  }

  translateServiceName = (name: string): string => {
    switch (name) {
      case 'mechanical': return 'Mecânico';
      case 'car_wash': return 'Lava Rápido';
      case 'restaurant': return 'Restaurante';
      case 'convenience_store': return 'Loja de Conveniência';
      case 'tire_repair_shop': return 'Borracharia';
    }
  }

  closeDialog = () => {
    this.dialogRef.close();
  }

  cancel = () => {
    this.closeDialog();
  }

}
