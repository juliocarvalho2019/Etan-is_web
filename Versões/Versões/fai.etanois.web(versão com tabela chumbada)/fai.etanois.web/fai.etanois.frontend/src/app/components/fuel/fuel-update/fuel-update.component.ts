import { Component, OnInit } from '@angular/core';
import { Fuel } from '../fuel.model';
import { FuelService } from '../fuel.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fuel-update',
  templateUrl: './fuel-update.component.html',
  styleUrls: ['./fuel-update.component.css']
})
export class FuelUpdateComponent implements OnInit {

  fuel: Fuel;

  constructor(
    private fuelService: FuelService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.fuelService.readById(id).subscribe(fuel => {
      this.fuel = this.fuel;
    });
  }

  updateFuel(): void {
    this.fuelService.update(this.fuel).subscribe(() => {
    
      this.fuelService.showMessage('Combustível  atualizado com sucesso!')
      this.router.navigate(['/dashboard/attendant'])
    },
    err => {
      // console.log('error: ', err);
      // this.old_passwordError = "Senha atual errada!";
    },
    () => console.log('HTTP request completed.')
    )
    
  }
  
  cancel(): void {
    this.router.navigate(['/dashboard/attendant'])
  }


}
