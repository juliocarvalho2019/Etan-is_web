
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';






@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = {
    username: undefined,
    email: undefined,
    password: undefined,
    new_password: undefined,
    old_password: undefined,
    name: undefined,
    cep: undefined,
    phone_number: undefined,
    // search_distance_with_route: 15,
    // search_distance_without_route: 15,
    // payment_mode: "dinheiro",
    // role: "frentista",
    // etacoins: 10,
  }

  emailError: string = '';
  userNameError: string = '';
  // Aqui damos um nome para nosso formulário
  // E ele precisa ser do tipo FormGroup
  formularioDeUsuario: FormGroup;
  // Via DI, nós obtemos o FormBuilder.
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.criarFormularioDeUsuario();

  }

  createUser(): void {
    console.log("usuário: ", this.user);
    this.userService.create(this.user).subscribe(
      res => {
        console.log('HTTP response', res);
        this.userService.showMessage('Usuário criado com sucesso!');
        this.router.navigate(['user/created/successfully']);
      },
      err => {
        console.log('error: ', err);
        if (err.error.msg[0] === 'E-mail is already in use') {
          this.emailError = 'Esse e-mail já está cadastrado!';
          this.userService.errorHandler('Erro!');
        } else if (err.error.msg[0] === 'Username is already in use') {
          this.userNameError = 'Esse apelido já está cadastrado!';
          this.userService.errorHandler('Erro!');
        }
      },
      () => console.log('HTTP request completed.')
    );
  }

  cancel(): void {
    this.router.navigate(['/'])
  }


  //Início Validações usuário
  enviarDados() {
    const dadosFormulario = this.formularioDeUsuario.value;
    const usuario = (
      dadosFormulario.name,
      dadosFormulario.username,
      dadosFormulario.email,
      dadosFormulario.password,
      dadosFormulario.cep

    );
    alert(`O usuário ${usuario.name} foi cadastrado com sucesso. \n Dados: ${JSON.stringify(usuario)}`);
    this.formularioDeUsuario.reset();
  }


  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ])],

      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ])],

      email: [
        '', Validators.compose([Validators.email])],

      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255)
        ])
      ],
      cep: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)
        ])
      ],

      phone_number: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11)
        ])],
    });
  }
  // Propriedades do formulário que vamos utilizar para obter os erros
  get name() {
    return this.formularioDeUsuario.get('name');
  }
  get username() {
    return this.formularioDeUsuario.get('username');
  }

  get email() {
    return this.formularioDeUsuario.get('email');
  }

  get password() {
    return this.formularioDeUsuario.get('password');
  }
  get cep() {
    return this.formularioDeUsuario.get('cep');
  }
  get phone_number() {
    return this.formularioDeUsuario.get('phone_number');
  }
  //Fim Validações


  //Início Máscaras
  maskCep: string;
  cepMask() {
    const value = this.formularioDeUsuario.get('cep').value;
    // console.log(value, value.length, this.formularioForm)
    if (value.length <= 8) {
      this.maskCep = '00.000-000'
    }
  }

  maskPhone: string;
  phoneNumberMask() {
    const value = this.formularioDeUsuario.get('phone_number').value;
    // console.log(value, value.length, this.formularioForm)
    if (value.length <= 11) {
      this.maskPhone = '(00)00000-0000'
    }
  }


}
