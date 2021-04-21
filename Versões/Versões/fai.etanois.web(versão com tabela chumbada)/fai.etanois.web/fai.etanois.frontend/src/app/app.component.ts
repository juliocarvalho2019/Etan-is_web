import { HeaderService } from './components/template/header/header.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  name='Angular';
  titlte='';

  constructor(private hearderService:HeaderService){}
  usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

  ngOninit(){
    // this.hearderService.title.subscribe(title => {
    //   this.titlte = title;
   // })
  }

}
