import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  userId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.userId = this.data.userId;
  }

  confirmDelete = () => {
    this.userService.delete(this.userId)
      .then((res) => {
        this.userService.clearUser();
        this.closeDialog();
      })
      .catch((err: HttpErrorResponse) => {
        console.log('Erro ao deletar usuário', err);
      });
  }

  closeDialog = () => {
    this.dialogRef.close();
  }

  cancel = () => {
    this.closeDialog();
  }

}
