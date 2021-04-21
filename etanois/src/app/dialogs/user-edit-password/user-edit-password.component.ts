import { UserService } from './../../services/user/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-edit-password',
  templateUrl: './user-edit-password.component.html',
  styleUrls: ['./user-edit-password.component.css']
})
export class UserEditPasswordComponent implements OnInit {
  user: User;
  userGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserEditPasswordComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.data.user;

    this.userGroup = this.formBuilder.group({
      old_password: [this.user.old_password, Validators.required],
      new_password: [this.user.new_password, Validators.required]
    });
  }

  confirmUpdate = (event: Event) => {
    event.preventDefault();
    const { old_password } = this.userGroup.value;
    const { new_password } = this.userGroup.value;
    const updatedUser: Partial<User> = { old_password, new_password };

    this.userService.update(this.user.id, updatedUser)
      .then((res) => {
        console.log(res);
        this.closeDialog();
      })
      .catch((err: HttpErrorResponse) => {
        console.log('Erro ao editar usuário', err);
      });
  }

  closeDialog = () => {
    this.dialogRef.close();
  }

  cancel = () => {
    this.closeDialog();
  }
}
