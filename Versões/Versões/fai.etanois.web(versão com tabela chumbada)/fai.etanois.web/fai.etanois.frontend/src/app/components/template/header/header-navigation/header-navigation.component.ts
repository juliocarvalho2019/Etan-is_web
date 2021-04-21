
import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.css']
})
export class HeaderNavigationComponent implements OnInit {
  usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado")); 
  

  constructor(private hearderService:HeaderService) { }

  ngOnInit(): void {


}
}
