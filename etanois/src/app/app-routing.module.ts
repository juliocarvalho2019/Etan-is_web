import { AttendantComponent } from './pages/attendant/attendant.component';
import { GoalsComponent } from './pages/goals/goals.component';
import { HomeComponent } from './pages/home/home.component';
import { ManagementComponent } from './pages/management/management.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'attendant', component: AttendantComponent },
  { path: 'goals', component: GoalsComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'management', component: ManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
