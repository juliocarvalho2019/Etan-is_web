import { Router } from '@angular/router';
import { GasStationServices } from './../../models/services.model';
import { UserService } from './../../services/user/user.service';
import { GasStationService } from './../../services/gas-station/gas-station.service';
import { Fuel } from './../../models/fuel.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuelAddEditComponent } from '../../dialogs/fuel-add-edit/fuel-add-edit.component';
import { FuelDeleteComponent } from '../../dialogs/fuel-delete/fuel-delete.component';
import { User } from '../../models/user.model';
import { FuelStation } from '../../models/gas-station.model';
import { Subscription } from 'rxjs';
import { ServiceAddEditComponent } from '../../dialogs/service-add-edit/service-add-edit.component';
import { ServiceDeleteComponent } from '../../dialogs/service-delete/service-delete.component';

enum menus {
  fuelManagement,
  servicesManagement,
  attendantManagement,
}

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit, OnDestroy {
  public user: User;
  public currentGasStation: FuelStation;
  private userSub: Subscription;
  private currentGasStationSub: Subscription;

  public activeMenu: menus;
  private availableFuels: Fuel[] = [];
  private availableServices: GasStationServices[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private gasStationService: GasStationService,
  ) { }

  ngOnInit(): void {
    this.activeMenu = menus.fuelManagement;

    this.userSub = this.userService.userChange.subscribe((user: User) => {
      this.user = user;
    });

    this.currentGasStationSub = this.gasStationService.currentGasStationChange.subscribe((gasStation: FuelStation) => {
      this.currentGasStation = gasStation;
      this.availableFuels = this.currentGasStation.available_fuels;
      this.availableServices = this.currentGasStation.available_services;
    });

    this.user = this.userService.getUser();
    this.currentGasStation = this.gasStationService.getCurrentGasStation();
    this.availableFuels = this.currentGasStation.available_fuels;
    this.availableServices = this.currentGasStation.available_services;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.currentGasStationSub.unsubscribe();
  }

  deleteFuel = (fuelName: string, fuelId: number) => {
    const dialogRef = this.dialog.open(FuelDeleteComponent, {
      data: {
        fuelName,
        fuelId
      }
    });
  }
  // editFuel = (fuel: Fuel) => {
  //   const dialogRef = this.dialog.open(FuelAddEditComponent, {
  //     data: {
  //       title: 'Editar combustível',
  //       fuel
  //     }
  //   });
  // }

  editFuel = (fuel: Fuel) => {
    const dialogRef = this.dialog.open(FuelAddEditComponent, {
      data: {
        fuel
      }
    });
  }
  // addFuel = () => {
  //   const dialogRef = this.dialog.open(FuelAddEditComponent, {
  //     data: {
  //       title: 'Criar combustível'
  //     }
  //   });
  // }

  addFuel = () => {
    const dialogRef = this.dialog.open(FuelAddEditComponent);
  }

  deleteService = (service: GasStationServices) => {
    const dialogRef = this.dialog.open(ServiceDeleteComponent, {
      data: {
        service
      }
    });
  }

  editService = (service: GasStationServices) => {
    const dialogRef = this.dialog.open(ServiceAddEditComponent, {
      data: {
        service
      }
    });
  }

  addService = () => {
    const dialogRef = this.dialog.open(ServiceAddEditComponent);
  }

  translateServiceName = (name: string): string => {
    switch (name) {
      case 'mechanical': return 'Mecânico';
      case 'car_wash': return 'Lava Rápido';
      case 'restaurant': return 'Restaurante';
      case 'convenience_store': return 'Loja de Conveniência';
      case 'tire_repair_shop': return 'Borracharia';
    }
  }

  changeMenu = (menuId: number) => {
    this.activeMenu = menuId;
  }

  backToGasStationChoose = () => {
    this.gasStationService.clearCurrentGasStation();
    this.router.navigate(['/attendant']);
  }
}
