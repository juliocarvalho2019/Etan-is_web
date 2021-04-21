import { User } from './../../user/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from './header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuarioLogado: User = null; 

  constructor(private headerService: HeaderService) {}
  
  ngOnInit(): void {
    this.headerService.usuarioLogado.subscribe(usuarioLogado => {
      // console.log('aqui teste', usuarioLogado);      
      this.usuarioLogado = usuarioLogado;
    });
  }
}
