import { FuelStationService } from './../fuel-state.service';
import { Component, OnInit } from '@angular/core';
import { FuelStation } from '../fuel_station.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fuel-station-delete',
  templateUrl: './fuel-station-delete.component.html',
  styleUrls: ['./fuel-station-delete.component.css']
})
export class FuelStationDeleteComponent implements OnInit {

  fuelStation: FuelStation


  constructor(private fuelStationService: FuelStationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.fuelStationService.readById(id).subscribe(fuelStation => {
      this.fuelStation = fuelStation;
    })
  }

  deleteFuelStation(): void {
    this.fuelStationService.delete(this.fuelStation.id).subscribe(() => {
      this.fuelStationService.showMessage('Posto Excluido com sucesso!')
      this.router.navigate(['/posts']);
    })
  }
  cancel(): void {
    this.router.navigate(['/posts']);

  }

}

