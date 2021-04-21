import { GasStationService } from 'src/app/services/gas-station/gas-station.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fuel-station-delete',
  templateUrl: './fuel-station-delete.component.html',
  styleUrls: ['./fuel-station-delete.component.css']
})
export class FuelStationDeleteComponent implements OnInit {
  fuelStationId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FuelStationDeleteComponent>,
    public gasStationService: GasStationService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.fuelStationId = this.data.fuelStationId;
  }
  confirmDelete = () => {

    this.gasStationService.delete(this.fuelStationId)
      .then((res) => {
        this.gasStationService.clearGasStation();
        this.closeDialog();
      })
      .catch((err: HttpErrorResponse) => {
        console.log('Erro ao deletar posto de combustível', err);
      });
  }

  closeDialog = () => {
    this.dialogRef.close();
  }

  cancel = () => {
    this.closeDialog();
  }

}
