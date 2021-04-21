import { Component, OnInit, Input } from '@angular/core';
import { Fuel } from '../fuel.model';
import { FuelService } from '../fuel.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogElementsComponent } from '../../dialog-elements/dialog-elements.component';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-fuel-delete',
  templateUrl: './fuel-delete.component.html',
  styleUrls: ['./fuel-delete.component.css']
})
export class FuelDeleteComponent implements OnInit {

  fuel: Fuel;

  constructor(
    private fuelService: FuelService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    this.fuelService.readById(id).subscribe(fuel => {
      this.fuel = fuel;
    });
    
  }

  deleteFuel(): void {
    console.log(this.fuel.id)
    this.fuelService.delete(this.fuel.id).subscribe(() => {
      this.fuelService.showMessage('Combustível Excluido com sucesso!')
      this.router.navigate(['']);
    })
  }
  cancel(): void {
    this.router.navigate(['/dashboard/attendant'])

  }

  @Input() usuarioLogado: User;
  enviaUsuario(user: Storage): void {
    this.usuarioLogado = JSON.parse(user["usuarioLogado"]);
    this.usuarioLogado = this.usuarioLogado["userResponse"]["payload"];
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogElementsComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.fuelService.delete(this.usuarioLogado.id).subscribe(() => {
          this.fuelService.showMessage('Combustível Excluido com sucesso!')
          this.router.navigate(['']);
        })
      }else{
        this.router.navigate(['/dashboard/attendant'])
      }

    });

  }

}
