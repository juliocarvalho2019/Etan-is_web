import { ModalElementsComponent } from './../../modal-elements/modal-elements.component';
import { FuelService } from './../fuel.service';
import { Component, OnInit } from '@angular/core';
import { Fuel } from '../fuel.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-fuel-create',
  templateUrl: './fuel-create.component.html',
  styleUrls: ['./fuel-create.component.css']
})
export class FuelCreateComponent implements OnInit {


  fuel: Fuel = {
    name: undefined,
    price: undefined
  }
  

  constructor(
    public dialog: MatDialog,
    private fuelService: FuelService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
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
  cancel(): void {
    this.router.navigate(['/dashboard/attendant'])
  }

  openDialog() {
    let dialogRef = this.dialog.open(ModalElementsComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log("encerrrado", result);
      
    });

  }

}
