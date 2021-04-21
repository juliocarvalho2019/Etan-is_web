import { Component, OnInit } from '@angular/core';
import { FuelStation } from '../fuel_station.model';
import { FuelStationService } from '../fuel-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fuel-station-read',
  templateUrl: './fuel-station-read.component.html',
  styleUrls: ['./fuel-station-read.component.css']
})
export class FuelStationReadComponent implements OnInit {
  fuelStations: FuelStation[] = [];
  displayedColumns:string[] = ['name', 'street'
  //'id', 'cnpj', 'neighborhood', 'cep' , 'time_to_open', 'time_to_close'
  , 'action']


  constructor(private fuelStationService: FuelStationService, private router: Router) { }

  ngOnInit(): void {
    this.fuelStationService.read().subscribe(obj => {
      this.fuelStations = obj.payload.fuel_stations
      console.log(obj)
    })
  }
  navigateToFuelStation(): void {
    this.router.navigate(['Gas/Station/Attendant/Manager/Access'])
  }

}