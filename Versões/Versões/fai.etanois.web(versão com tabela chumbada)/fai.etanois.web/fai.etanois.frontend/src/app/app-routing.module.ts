import { FuelCrudComponent } from './views/fuel-crud/fuel-crud.component';
import { DashboardAttendantComponent } from './views/dashboard-attendant/dashboard-attendant.component';
import { FuelDeleteComponent } from './components/fuel/fuel-delete/fuel-delete.component';
import { FuelReadComponent } from './components/fuel/fuel-read/fuel-read.component';
import { FuelUpdateComponent } from './components/fuel/fuel-update/fuel-update.component';

import { NotFoundComponent } from './views/not-found/not-found.component';
import { ObjectiveComponent } from './views/objective/objective.component';
import { UserCreatedSuccessfullyComponent } from './views/user-created-successfully/user-created-successfully.component';
import { AttendantAreaLoginComponent } from './views/attendant-area-login/attendant-area-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';

import { FuelStationCreateComponent } from './components/fuel-station/fuel-station-create/fuel-station-create.component';
import { FuelStationUpdateComponent } from './components/fuel-station/fuel-station-update/fuel-station-update.component';
import { FuelStationDeleteComponent } from './components/fuel-station/fuel-station-delete/fuel-station-delete.component';
import { FuelStationReadComponent } from './components/fuel-station/fuel-station-read/fuel-station-read.component';
import { PostCreatedSuccessfullyComponent } from './views/post-created-successfully/post-created-successfully.component';
import { PostCrudComponent } from './views/post-crud/post-crud.component';

import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { FuelCreateComponent } from './components/fuel/fuel-create/fuel-create.component';
import { GasStationAttendantManagerAccessComponent } from './views/gas-station-attendant-manager-access/gas-station-attendant-manager-access.component';






const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "objectives",
    component: ObjectiveComponent
  },
  {
    path: "attendant/area/login",
    component: AttendantAreaLoginComponent
  },
  {
    path: "Forgot/Password",
    component: ForgotPasswordComponent
  },
  {
    path: "user/create",
    component: UserCreateComponent
  },
  {
    path: "user/update/:id",
    component: UserUpdateComponent
  },
  {
    path: "user/delete/:id",
    component: UserDeleteComponent
  },
  {
    path: "post",
    component: PostCrudComponent
  },
  {
    path: "fuelStation/create",
    component: FuelStationCreateComponent
  },
  {
    path: "fuelStation/update/:id",
    component: FuelStationUpdateComponent
  },
  {
    path: "fuelStation/delete/:id",
    component: FuelStationDeleteComponent
  },
  {
    path: "fuelStation/read/:id",
    component: FuelStationReadComponent
  },
  {
    path: "fuel/create",
    component: FuelCreateComponent
  },
  {
    path: "fuel/update",
    component: FuelUpdateComponent
  },
  {
    path: "fuel/read",
    component: FuelReadComponent
  },
  {
    path: "fuel/delete",
    component: FuelDeleteComponent
  },
  {
    path: "fuel/crud",
    component: FuelCrudComponent
  },
  {
    path: "fuel/create",
    component: FuelCreateComponent
  },
  {
    path: "post/created/successfully",
    component: PostCreatedSuccessfullyComponent
  },
  {
    path: "user/created/successfully",
    component: UserCreatedSuccessfullyComponent
  },
  {
    path: "Gas/Station/Attendant/Manager/Access",
    component: GasStationAttendantManagerAccessComponent
  },
  {
    path: "dashboard/attendant",
    component: DashboardAttendantComponent
  },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
