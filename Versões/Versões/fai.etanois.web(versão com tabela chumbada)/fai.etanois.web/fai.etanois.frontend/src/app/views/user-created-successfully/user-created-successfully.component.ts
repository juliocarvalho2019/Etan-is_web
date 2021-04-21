import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/components/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-created-successfully',
  templateUrl: './user-created-successfully.component.html',
  styleUrls: ['./user-created-successfully.component.css']
})
export class UserCreatedSuccessfullyComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  actionButton(): void {
    this.router.navigate(['attendant-area-login']);
  }

}
