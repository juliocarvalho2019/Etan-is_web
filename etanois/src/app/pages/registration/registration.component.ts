import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';

import { UserService } from './../../services/user/user.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerGroup: FormGroup;
  registerError = {
    error: false,
    errorInfo: ''
  };
  registrationDone = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.registerGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cep: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }

  get name(): AbstractControl { return this.registerGroup.get('name'); }
  get username(): AbstractControl { return this.registerGroup.get('username'); }
  get email(): AbstractControl { return this.registerGroup.get('email'); }
  get cep(): AbstractControl { return this.registerGroup.get('cep'); }
  get password(): AbstractControl { return this.registerGroup.get('password'); }

  submitRegister = (event: Event) => {
    this.registerError.error = false;
    event.preventDefault();
    if (!this.registerGroup.valid) { return; }

    const { name, username, email, cep, password } = this.registerGroup.value;
    const newUser: User = { name, username, email, cep, password };
    this.userService.create(newUser)
      .then(() => {
        this.registrationDone = true;
      })
      .catch((httpErrorResponse: HttpErrorResponse) => {
        this.registerError.errorInfo = httpErrorResponse.error.msg[0];
        this.registerError.error = true;
      });
  }

  getErrorMessage = () => {
    if (this.registerError.error) {
      switch (this.registerError.errorInfo) {
        case 'E-mail is already in use': return 'E-mail já cadastrado.';
        case 'Username is already in use': return 'Usuário já cadastrado.';
        case 'CEP is invalid': return 'CEP inválido.';
        default: return this.registerError.errorInfo;
      }
    }
  }

}
