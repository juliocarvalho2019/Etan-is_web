import { Component, OnInit, Input, Inject } from '@angular/core';
import { FuelService } from '../fuel/fuel.service';
import { Router } from '@angular/router';
import { Fuel } from '../fuel/fuel.model';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-elements',
  templateUrl: './modal-elements.component.html',
  styleUrls: ['./modal-elements.component.css']
})
export class ModalElementsComponent {
  fuel: Fuel;
  closeResult = '';

  constructor(
    private fuelService: FuelService,
    private router: Router,
    private dialogRef: MatDialogRef<ModalElementsComponent>,
    @ Inject ( MAT_DIALOG_DATA )  data )  {

      this.title  =  data . title ;
      // this.message = data.message;
  }
    
  onClose(result: Boolean) {
    // this.result = result;
    this.dialogRef.close(result);

  }

  createFuel(): void {
    this.fuelService.create(this.fuel).subscribe(
      res => {
        console.log('HTTP response', res);
        this.fuelService.showMessage('Combustível criado com sucesso!');
      },
      err => {
        console.log('error: ', err);
        this.fuelService.errorHandler('Erro!');
      },
      () => console.log('HTTP request completed.')
    );
  }

  @Input() title: String = '';
  // @Input() message: String = '';
  editarDialog(title: string, message:string): void {
  this.title = title;
  // this.message = message;
  }
}
