import { User } from './../../components/user/user.model';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/components/user/user.service';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';






@Component({
  selector: 'app-attendant-area-login',
  templateUrl: './attendant-area-login.component.html',
  styleUrls: ['./attendant-area-login.component.css']
})
export class AttendantAreaLoginComponent implements OnInit {
  hide = true;
  login = {
    email: '',
    userName: '',
    password: '',
  }
  formularioDeUsuario: FormGroup;
  loginError: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private hearderService: HeaderService,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.criarFormularioDeUsuario();

  }

  cancel(): void {
    this.router.navigate(['/'])
  }
  enviarDados() {
    const dadosFormulario = this.formularioDeUsuario.value;

    const usuario = (
      dadosFormulario.userName,
      dadosFormulario.password
    );
    alert(`O usuário ${usuario.nome} foi cadastrado com sucesso. \n Dados: ${JSON.stringify(usuario)}`);
    this.formularioDeUsuario.reset();
  }
  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group(
      {
        email: ['',],
        userName: ['',],
        password: [
          '',
          Validators.compose([
            Validators.required,
          ])
        ],

      },
      {

      }
    );
  }

  get password() {
    return this.formularioDeUsuario.get('password');
  }

  actionLogin(): void {
    console.log('tokenAntes', sessionStorage.getItem('token'))
    this.userService.generateToken(this.login.email, this.login.password).subscribe(
      loginResponse => {
        sessionStorage.setItem('token', loginResponse.payload.token)
        sessionStorage.setItem('id', loginResponse.payload.id)
        console.log('tokenDepois', sessionStorage.getItem('token'))
        this.userService.readById(loginResponse.payload.id).subscribe(userResponse => {
          console.log('userResponse: ', userResponse);
          // console.log('sessionStorage: ', sessionStorage);



          if (userResponse != null) {
            sessionStorage.setItem('usuarioLogado', JSON.stringify({ userResponse }))
            this.hearderService.setUsuarioLogado(userResponse);
            // console.log('userResponse: ', sessionStorage);
            this.router.navigate(['/post']);
          } else {
            this.loginError = "Usuário ou senha inválidos!"
          }
        })
      },
      err => {
        console.log('error: ', err);
        this.loginError = "Usuário ou senha inválidos!";
      },
      () => console.log('HTTP request completed.'))

  }
}
