import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AttendantComponent } from './pages/attendant/attendant.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { GoalsComponent } from './pages/goals/goals.component';
import { ManagementComponent } from './pages/management/management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuelAddEditComponent } from './dialogs/fuel-add-edit/fuel-add-edit.component';
import { FuelDeleteComponent } from './dialogs/fuel-delete/fuel-delete.component';
import { UserEditComponent } from './dialogs/user-edit/user-edit.component';
import { UserDeleteComponent } from './dialogs/user-delete/user-delete.component';
import { ServiceDeleteComponent } from './dialogs/service-delete/service-delete.component';
import { ServiceAddEditComponent } from './dialogs/service-add-edit/service-add-edit.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { UserEditPasswordComponent } from './dialogs/user-edit-password/user-edit-password.component';
import { FuelStationEditComponent } from './dialogs/fuel-station-edit/fuel-station-edit.component';
import { FuelStationDeleteComponent } from './dialogs/fuel-station-delete/fuel-station-delete.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AttendantComponent,
    RegistrationComponent,
    GoalsComponent,
    ManagementComponent,
    FuelDeleteComponent,
    UserDeleteComponent,
    UserEditComponent,
    FuelAddEditComponent,
    ServiceDeleteComponent,
    ServiceAddEditComponent,
    UserEditPasswordComponent,
    FuelStationEditComponent,
    FuelStationDeleteComponent,
    
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    CurrencyMaskModule,
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
