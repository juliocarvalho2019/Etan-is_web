import { UserEditPasswordComponent } from './../../dialogs/user-edit-password/user-edit-password.component';
import { FuelStation } from './../../models/gas-station.model';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../../models/user.model';
import { UserService } from './../../services/user/user.service';
import { GasStationService } from './../../services/gas-station/gas-station.service';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../../dialogs/user-edit/user-edit.component';
import { UserDeleteComponent } from '../../dialogs/user-delete/user-delete.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: User;
  public currentGasStation: FuelStation;
  private userSub: Subscription;
  private currentGasStationSub: Subscription;

  constructor(
    private userService: UserService,
    private gasStationService: GasStationService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userSub = this.userService.userChange.subscribe((user: User) => {
      this.user = user;
    });

    this.currentGasStationSub = this.gasStationService.currentGasStationChange.subscribe((gasStation: FuelStation) => {
      this.currentGasStation = gasStation;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.currentGasStationSub.unsubscribe();
  }

  editUser = () => {
    const dialogRef = this.dialog.open(UserEditComponent, {
      data: {
        user: this.user
      }
    });
  }
  editPassword = () => {
    const dialogRef = this.dialog.open(UserEditPasswordComponent, {
      data: {
        user: this.user
      }
    });
  }

  deleteUser = () => {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      data: {
        userId: this.user.id
      }
    });
  }

  logout = () => {
    this.userService.clearUser();
    this.router.navigate(['/']);
  }
}
