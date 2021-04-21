import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'


@Component({
  selector: 'app-post-crud',
  templateUrl: './post-crud.component.html',
  styleUrls: ['./post-crud.component.css']
})
export class PostCrudComponent implements OnInit {
  
 

  constructor(private router: Router) {
 
  }

  ngOnInit(): void {
    
  }

  navigateToFuelStationCreate(): void {
    this.router.navigate(['/fuelStation/create'])
  }
  navigateToFuelStation(): void {
    this.router.navigate(['Gas/Station/Attendant/Manager/Access'])
  }

}
