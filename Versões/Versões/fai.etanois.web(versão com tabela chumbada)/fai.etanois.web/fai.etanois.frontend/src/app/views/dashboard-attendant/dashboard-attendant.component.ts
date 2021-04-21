import { Component, OnInit, Input } from '@angular/core';
import { FuelService } from 'src/app/components/fuel/fuel.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard-attendant',
  templateUrl: './dashboard-attendant.component.html',
  styleUrls: ['./dashboard-attendant.component.css']
})
export class DashboardAttendantComponent implements OnInit {

  constructor(
    private fuelService: FuelService,
    private router: Router,
    private fb: FormBuilder
  ) { 

    
  }

  @Input() isTrue: boolean;
  

  ngOnInit(): void {
    
  }

  createFuel(): void {
    // this.fuelService.create(this.fuel).subscribe(
    //   res => {
    //     console.log('HTTP response', res);
    //     this.fuelService.showMessage('Combustível criado com sucesso!');
    //   },
    //   err => {
    //     console.log('error: ', err);
    //     this.fuelService.errorHandler('Erro!');
    //   },
    //   () => console.log('HTTP request completed.')
    // );
  }

}
