import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css']
})
export class UserReadComponent implements OnInit {

  user: User[]
  displayedColumns = ['id', 'username', 'email', 'password', 'name', 'cep'
    , 'search_distance_with_route', 'search_distance_without_route', 'payment_mode', 'phone_number', 'role',
    'etacoins', 'action']

  constructor(
    public dialog: MatDialog,
    private userService: UserService) { }


  ngOnInit(): void {
  //  this.userService.read().subscribe(user => {
  //   this.user = user
  //  console.log(user)
  // })
  }

}