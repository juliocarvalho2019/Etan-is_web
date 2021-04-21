import { FuelStationService } from './../fuel-state.service';
import { FuelStation } from './../fuel_station.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../user/user.model';


@Component({
  selector: 'app-fuel-station-create',
  templateUrl: './fuel-station-create.component.html',
  styleUrls: ['./fuel-station-create.component.css']
})
export class FuelStationCreateComponent implements OnInit {

  fuelStation: FuelStation = {
    name: undefined,
    cnpj: undefined,
    street: undefined,
    neighborhood: undefined,
    cep: undefined,
    time_to_open: undefined,
    time_to_close: undefined,
    // password: '12345678',
    // openning_hours: '24h',
    // restaurant: false,
    // car_wash: true,
    // mechanical: false
  }
  cnpjError: string = '';
  cepError: string = '';
  // Aqui damos um nome para nosso formulário
  // E ele precisa ser do tipo FormGroup
  formulario: FormGroup;
  // Via DI, nós obtemos o FormBuilder.

  constructor(
    private fuelStationService: FuelStationService,
    private router: Router,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.criarFormulario();
    this.enviaUsuario(sessionStorage);
  }

  enviarDados() {
    const dadosFormulario = this.formulario.value;
    const fuelStation = (
      dadosFormulario.name,
      dadosFormulario.cnpj,
      dadosFormulario.street,
      dadosFormulario.neighborhood,
      dadosFormulario.cep,
      dadosFormulario.time_to_open,
      dadosFormulario.time_to_open
    );
    alert(`O Posto ${fuelStation.name} foi cadastrado com sucesso. \n Dados: ${JSON.stringify(fuelStation)}`);
    this.formulario.reset();
  }

  criarFormulario() {
    this.formulario = this.fb.group({
      name: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ])],

      cnpj: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ])],

      street: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50)
        ])
      ],
      neighborhood: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50)
        ])],

      cep: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10)
        ])],

      time_to_open: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)
        ])],

      time_to_close: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)
        ])],
    });
  }
  createFuelStation(): void {
    this.fuelStationService.create(this.fuelStation).subscribe(
      res => {
        console.log('HTTP response', res);
        this.fuelStationService.showMessage('Posto criado com sucesso!')
        this.router.navigate(['post/created/successfully'])
      },
      err => {
        console.log('error: ', err);
        if (err.error.msg[0] === 'Invalid CNPJ') {
          this.cnpjError = 'CNPJ Inválido!';
          this.fuelStationService.errorHandler('Erro!');
        } else if (err.error.msg[0] === 'CNPJ is already in use') {
          this.cnpjError = 'CNPJ já esta cadastrado!';
          this.fuelStationService.errorHandler('Erro!');
        }else if (err.error.msg[0] === 'CEP is invalid') {
          this.cepError = 'CEP inválido!';
          this.fuelStationService.errorHandler('Erro!');
        }
      },
      () => console.log('HTTP request completed.')

    );
  }
  cancel(): void {
    this.router.navigate(['/post'])
  }

  @Input() usuarioLogado: User;
  enviaUsuario(user: Storage): void {
    this.usuarioLogado = JSON.parse(user["usuarioLogado"]);
    this.usuarioLogado = this.usuarioLogado["userResponse"]["payload"];

  }
  // Propriedades do formulário que vamos utilizar para obter os erros
  get name() {
    return this.formulario.get('name');
  }
  get cnpj() {
    return this.formulario.get('cnpj');
  }

  get street() {
    return this.formulario.get('street');
  }

  get neighborhood() {
    return this.formulario.get('neighborhood');
  }

  get cep() {
    return this.formulario.get('cep');
  }
  get time_to_open() {
    return this.formulario.get('time_to_open');
  }
  get time_to_close() {
    return this.formulario.get('time_to_close');
  }
  //regras de negócio do component
  maskCnpj: string;
  cnpjMask() {
    const value = this.formulario.get('cnpj').value;
    // console.log(value, value.length, this.formularioForm)
    if (value.length <= 14) {
      this.maskCnpj = '00.000.000/0000-00'
    }
  }

  maskCep: string;
  cepMask() {
    const value = this.formulario.get('cep').value;
    // console.log(value, value.length, this.formularioForm)
    if (value.length <= 8) {
      this.maskCep = '00.000-000'
    }

  }

  // maskPhone: string;
  // phoneNumberMask() {
  //   const value = this.formulario.get('phone_number').value;
  //   // console.log(value, value.length, this.formularioForm)
  //   if (value.length < 11) {
  //     this.maskPhone = '(00)0000-0000'
  //   } else if (value.length >= 11) {
  //     this.maskPhone = '(00)00000-0000'
  //   }

  // }

  // maskPaymentCard: string;
  // PaymentCardMask() {
  //   const value = this.formulario.get('payment_card').value;
  //   // console.log(value, value.length, this.formularioForm)
  //   if (value.length <= 16) {
  //     this.maskPaymentCard = '0000.0000.0000.0000'
  //   }

  // }


}
