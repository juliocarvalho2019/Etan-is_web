import { FuelStationEditComponent } from './../../dialogs/fuel-station-edit/fuel-station-edit.component';
import { FuelAddEditComponent } from './../../dialogs/fuel-add-edit/fuel-add-edit.component';
import { GasStationService } from 'src/app/services/gas-station/gas-station.service';
import { FuelStationDeleteComponent } from './../../dialogs/fuel-station-delete/fuel-station-delete.component';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from './../../services/user/user.service';
import { AuthService } from './../../services/auth/auth.service';
import { FuelStation } from './../../models/gas-station.model';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { stringify } from '@angular/compiler/src/util';

enum steps {
  login,
  gasStationChoose,
  gasStationAccessCode,
  gasStationRegister,
  gasStationRegisterDone,
  passwordRecover,
  passwordEmailSended
}

@Component({
  selector: 'app-attendant',
  templateUrl: './attendant.component.html',
  styleUrls: ['./attendant.component.css']
})
export class AttendantComponent implements OnInit, OnDestroy {
  public user: User;
  private userSub: Subscription;
  public fuelStation: FuelStation;
  private fuelStationSub: Subscription;

  // fuelStation: FuelStation;
  // fuelStationSub: Subscription;

  @Input() titlte: string;
  title = "Editar Posto de Combustível"

  currentGasStation: FuelStation;
  currentGasStationSub: Subscription;
  gasStations: FuelStation[] = [];
  gasStationsSub: Subscription;

  gasStationsFlags: string[] = [];
  gasStationsFlagsSub: Subscription;

  loginGroup: FormGroup;
  passwordRecoverGroup: FormGroup;
  gasStationLoginGroup: FormGroup;
  gasStationRegisterGroup: FormGroup;

  currentStep: steps = 0;

  httpError = {
    error: false,
    errorInfo: ''
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private gasStationService: GasStationService,
    private fuelStationService: GasStationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.loginGroup = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });

    this.passwordRecoverGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    // this.gasStationLoginGroup = this.formBuilder.group({
    //   accessCodeField1: new FormControl('', [Validators.required]),
    //   accessCodeField2: new FormControl('', [Validators.required]),
    //   accessCodeField3: new FormControl('', [Validators.required])
    // });

    this.gasStationRegisterGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      flag: new FormControl('branca', [Validators.required]),
      cnpj: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
      street: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      streetNumber: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
      neighborhood: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      zip: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      openTime: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      closeTime: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
    });
    this.fuelStationSub = this.gasStationService.currentGasStationChange.subscribe((fuelStation: FuelStation) => {
      this.fuelStation = fuelStation;
    });
    this.userSub = this.userService.userChange.subscribe((user: User) => {
      this.user = user;
    });

    this.gasStationsSub = this.gasStationService.gasStationsChange.subscribe((gasStations: FuelStation[]) => {
      this.gasStations = gasStations;
    });

    this.currentGasStationSub = this.gasStationService.currentGasStationChange.subscribe((currentGasStation: FuelStation) => {
      this.currentGasStation = currentGasStation;
    });

    this.gasStationsFlagsSub = this.gasStationService.gasStationsFlagsChange.subscribe((gasStationsFlags: string[]) => {
      this.gasStationsFlags = gasStationsFlags;
    });

    if (this.userService.getUser()) {
      this.currentStep = steps.gasStationChoose;
      this.user = this.userService.getUser();
      this.gasStations = this.gasStationService.getGasStations();
      this.fuelStation = this.fuelStationService.getFuelStation();
    }

    FuelStationEditComponent;

  }

  ngOnDestroy(): void {
    this.fuelStationSub.unsubscribe();
    this.userSub.unsubscribe();
    this.gasStationsSub.unsubscribe();
    this.currentGasStationSub.unsubscribe();
    this.gasStationsFlagsSub.unsubscribe();
  }

  get loginUsername(): AbstractControl { return this.loginGroup.get('username'); }
  get loginPassword(): AbstractControl { return this.loginGroup.get('password'); }

  get recoverEmail(): AbstractControl { return this.passwordRecoverGroup.get('email'); }

  get name(): AbstractControl { return this.gasStationRegisterGroup.get('name'); }
  get flag(): AbstractControl { return this.gasStationRegisterGroup.get('flag'); }
  get cnpj(): AbstractControl { return this.gasStationRegisterGroup.get('cnpj'); }
  get street(): AbstractControl { return this.gasStationRegisterGroup.get('street'); }
  get streetNumber(): AbstractControl { return this.gasStationRegisterGroup.get('streetNumber'); }
  get neighborhood(): AbstractControl { return this.gasStationRegisterGroup.get('neighborhood'); }
  get zip(): AbstractControl { return this.gasStationRegisterGroup.get('zip'); }
  get openTime(): AbstractControl { return this.gasStationRegisterGroup.get('openTime'); }
  get closeTime(): AbstractControl { return this.gasStationRegisterGroup.get('closeTime'); }
  get phone(): AbstractControl { return this.gasStationRegisterGroup.get('phone'); }


  back = () => {
    switch (this.currentStep) {
      case 1:
      case 5:
      case 6:
        this.currentStep = steps.login;
        break;
      case 2:
        this.currentGasStation = undefined;
        break;
      case 3:
      case 4:
        this.currentStep = steps.gasStationChoose;
        break;
    }
  }

  submitLogin = (event: Event) => {
    this.httpError.error = false;
    event.preventDefault();
    if (!this.loginGroup.valid) { return; }
    const { username, password } = this.loginGroup.value;
    this.authService.doLogin(username, password)
      .then((userId: number) => {
        this.userService.getUserById(userId);
        return userId;
      })
      .then((userId: number) => {
        return this.gasStationService.getGasStationsByUserId();
      })
      .then(() => {
        this.currentStep = steps.gasStationChoose;
      })
      .catch((httpErrorResponse: HttpErrorResponse) => {
        this.httpError.error = true;
        this.httpError.errorInfo = httpErrorResponse.status === 401 ? 'Usuário ou senha incorretos.' : httpErrorResponse.error.msg[0];
      });
  }

  accessCode = (gasStation: FuelStation) => {
    this.gasStationService.setCurrentGasStation(gasStation);
    this.currentStep = steps.gasStationAccessCode;
  }

  submitGasLogin = (event: Event) => {
    // event.preventDefault();
    // if (!this.gasStationLoginGroup.valid) { return; }
    // Depois colocar a validação dessa senha de postos que ainda não está pronta
    this.router.navigate(['management']);
  }

  submitGasRegister = (event: Event) => {
    this.httpError.error = false;
    event.preventDefault();
    if (!this.gasStationRegisterGroup.valid) { return; }
    // Montar o pacote certo para ser criado pois falta algumas informações
    const { name, flag, cnpj, street, streetNumber, neighborhood, zip, openTime, closeTime, phone } = this.gasStationRegisterGroup.value;

    const newGasStation: FuelStation = {
      name,
      flag_of_fuel_station: flag,
      cnpj,
      street,
      street_number: streetNumber,
      neighborhood,
      cep: zip,
      time_to_open: openTime,
      time_to_close: closeTime,
      phone_number: phone
    };

    this.gasStationService.create(newGasStation)

      .then((res) => {
        console.log(newGasStation);
        this.currentStep = steps.gasStationRegisterDone;
        // this.gasStationService.getGasStationsByUserId(this.user.id); // USAR PARA ATUALIZAR A LISTA DE POSTOS
      })
      .catch((httpErrorResponse: HttpErrorResponse) => {
        this.httpError.errorInfo = httpErrorResponse.error.msg[0];
        this.httpError.error = true;
      });
  }

  initGasStationRegister = () => {
    this.httpError.error = false;
    this.gasStationService.getGasStationsFlags()
      .then(() => {
        this.currentStep = steps.gasStationRegister;
      })
      .catch((httpErrorResponse: HttpErrorResponse) => {
        this.httpError.errorInfo = httpErrorResponse.error.msg[0];
        this.httpError.error = true;
      });
  }

  recoverPasswordInit = () => {
    this.currentStep = steps.passwordRecover;
  }

  submitRecoverPassword = (event: Event) => {
    event.preventDefault();
    this.httpError.error = false;
    if (!this.passwordRecoverGroup.valid) { return; }
    const { email } = this.passwordRecoverGroup.value;
    this.userService.recoverPassword(email)
      .then((res) => {
        this.currentStep = steps.passwordEmailSended;
      })
      .catch((httpErrorResponse: HttpErrorResponse) => {
        this.httpError.errorInfo = httpErrorResponse.error.msg[0];
        this.httpError.error = true;
      });
  }

  getErrorMessage = () => {
    if (this.httpError.error) {
      switch (this.httpError.errorInfo) {
        case 'Phone number is already in use': return 'Telefone já cadastrado.';
        case 'CNPJ is already in use': return 'CNPJ já cadastrado.';
        case 'Invalid CNPJ': return 'CNPJ inválido.';
        case 'CEP is invalid ': return 'CEP inválido.';
        case 'User not found': return 'Email não encontrado.';
        case 'Invalid opening hours': return 'Horário de funcionamento inválido';
        default: return this.httpError.errorInfo;
      }
    }
  }

  editFuelStation = () => {
    const dialogRef = this.dialog.open(FuelStationEditComponent, {
      data: {
        fuelStation: this.fuelStation,
        // title: this.title
      }
    });
  }

  deleteFuelStation = () => {
    const dialogRef = this.dialog.open(FuelStationDeleteComponent, {
      data: {
        fuelStationId: this.fuelStation.id
      }
    });
  }
}
