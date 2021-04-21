import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { Router } from '@angular/router';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private hearderService: HeaderService) {
   
   }

  ngOnInit(): void {
    this.enviaUsuario(sessionStorage);
  }

  @Input() usuarioLogado: User;
  enviaUsuario(user: Storage): void {
    this.usuarioLogado = JSON.parse(user["usuarioLogado"]);
    this.usuarioLogado = this.usuarioLogado["userResponse"]["payload"];
  }

  navegateDashboardAttendant(): void {
    this.isTrue = false;
    this.router.navigate(['dashboard/attendant'])
    console.log("Resultado depois: " + this.isTrue);
  }

  // @Input() isTrue: boolean = false;
  private _isTrue: boolean = false;
  public get isTrue(): boolean {
    return this._isTrue;
  }
  public set isTrue(value: boolean) {
    this._isTrue = value;
  }
  navegateFuelCrud(): void {
    // this.router.navigate(['fuel/crud'])
    // console.log("Resultado antes: " + this.isTrue);
    this.isTrue = true;
    console.log("Resultado depois: " + this.isTrue);
  }

}
