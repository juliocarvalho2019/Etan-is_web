import { FuelStationService } from './../fuel-state.service';
import { Component, OnInit } from '@angular/core';
import { FuelStation } from '../fuel_station.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fuel-station-update',
  templateUrl: './fuel-station-update.component.html',
  styleUrls: ['./fuel-station-update.component.css']
})
export class FuelStationUpdateComponent implements OnInit {

  fuelStation: FuelStation

  constructor(
    private fuelStationService: FuelStationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.fuelStationService.readById(id).subscribe(fuelStation => {
      this.fuelStation = fuelStation;
    });
  }

  updateFuelStation(): void {
    this.fuelStationService.update(this.fuelStation).subscribe(() => {
      this.fuelStationService.showMessage('Posto atualizado com sucesso!')
      this.router.navigate(['/posts']);
    })
  }
  cancel(): void {
    this.router.navigate(['/posts']);

  }

}
