import { UserService } from 'src/app/components/user/user.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  user = {
    email: "",
  }

  formularioDeUsuario: FormGroup;
  emailError: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.criarFormularioDeUsuario();
  }

  enviarDados() {
    const dadosFormulario = this.formularioDeUsuario.value;

    const usuario = (
      dadosFormulario.email
    );
    this.formularioDeUsuario.reset();
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group(
      {
        email: ['', Validators.compose([Validators.email])],
      },
      {

      }
    );
  }
  get email() {
    return this.formularioDeUsuario.get('email');
  }

  enviarEmail(): void {
    this.userService.forgotPassword(this.user.email).subscribe(
      res => {
        console.log('HTTP response', res);
        this.userService.showMessage('E-mail enviado com sucesso!');
      },
      err => {
        console.log('error: ', err);

        if (err.error.msg[0] === 'User not found') {
          this.emailError = 'E-mail não encontrado, por favor, digite o e-mail cadastrado!';
          this.userService.errorHandler('Erro!');
        } 
      },

      () => {
   
    })
  }
}
