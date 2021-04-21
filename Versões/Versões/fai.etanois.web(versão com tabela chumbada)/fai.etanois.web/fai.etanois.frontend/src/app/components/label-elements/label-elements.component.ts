import { FuelStation } from './../fuel-station/fuel_station.model';
import { Component, OnInit, Input } from '@angular/core';
import { __importDefault } from 'tslib';

@Component({
  selector: 'app-label-elements',
  templateUrl: './label-elements.component.html',
  styleUrls: ['./label-elements.component.css']
})
export class LabelElementsComponent implements OnInit {

  

  constructor() { }

  ngOnInit(): void {
  
  }

  @Input() fuelStation: FuelStation;

}
