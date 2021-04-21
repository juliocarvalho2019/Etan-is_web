import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/components/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-created-successfully',
  templateUrl: './post-created-successfully.component.html',
  styleUrls: ['./post-created-successfully.component.css']
})
export class PostCreatedSuccessfullyComponent implements OnInit {

  user = {
    email:'',
    password:'',
    toke:''
  }

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  actionButton(): void {
    this.router.navigate(['post']);
  }

}
