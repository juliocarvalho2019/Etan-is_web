import { ManagementComponent } from './../../pages/management/management.component';
import { FuelService } from './../../services/fuel/fuel.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GasStationServices } from '../../models/services.model';
import { GasStationService } from '../../services/gas-station/gas-station.service';

@Component({
  selector: 'app-service-delete',
  templateUrl: './service-delete.component.html',
  styleUrls: ['./service-delete.component.css']
})
export class ServiceDeleteComponent implements OnInit {
  public currentService: GasStationServices = undefined;
  nomeServico : string;
 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ServiceDeleteComponent>,
    private gasStationService: GasStationService
  ) { }

  ngOnInit(): void {
    this.currentService = this.data.service;
    this.nomeServico = this.currentService.service_type;
  }

  confirmDelete = () => {
    this.gasStationService.deleteAvailableService(this.currentService.service_type)
      .then((res) => {
        this.dialogRef.close();
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
      });
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
