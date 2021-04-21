import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gas-station-attendant-manager-access',
  templateUrl: './gas-station-attendant-manager-access.component.html',
  styleUrls: ['./gas-station-attendant-manager-access.component.css']
})
export class GasStationAttendantManagerAccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['/post'])
  }

  navegateDashboardAttendant(): void {
    this.router.navigate(['dashboard/attendant'])
  }
  navigateToFuelStation(): void {
    this.router.navigate(['/fuelStation'])
  }

}
