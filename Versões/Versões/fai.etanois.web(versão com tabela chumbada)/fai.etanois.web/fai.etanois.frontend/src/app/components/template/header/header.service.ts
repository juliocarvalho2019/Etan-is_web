import { User } from './../../user/user.model';
import { Injectable, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  usuarioLogado = new BehaviorSubject<User>(null);

  constructor() { }

  setUsuarioLogado(usuarioLogado){
    this.usuarioLogado.next(usuarioLogado);
  }

  getUsuarioLogado(): User {
    return this.usuarioLogado.value;
  }

}
