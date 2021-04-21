import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalElementsComponent } from 'src/app/components/modal-elements/modal-elements.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-fuel-crud',
  templateUrl: './fuel-crud.component.html',
  styleUrls: ['./fuel-crud.component.css']
})
export class FuelCrudComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router) { }

    @Input() isTrue: boolean;

  ngOnInit(): void {
  }

  // navigateToFuelCrud(): void {
  //   this.router.navigate(['fuel/create'])
  // }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title:'Adicionar novo combustível',
      // message:'Deseja realmente excluir sua conta?'
  }; 
  
  let dialogRef = this.dialog.open(ModalElementsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("encerrrado", result);
    });

  }



}
