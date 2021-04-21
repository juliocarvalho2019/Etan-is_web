import { DialogElementsComponent } from './../../dialog-elements/dialog-elements.component';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';



@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  user: User



  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.readById(id).subscribe(user => {
      this.user = user;
    });
    this.enviaUsuario(sessionStorage);
  }

  deleteUser(): void {
    console.log(this.usuarioLogado.id)
    this.userService.delete(this.usuarioLogado.id).subscribe(() => {
      this.userService.showMessage('Usuário Excluido com sucesso!')
      this.router.navigate(['']);
    })
  }
  cancel(): void {
    this.router.navigate(['/post']);

  }

  @Input() usuarioLogado: User;
  enviaUsuario(user: Storage): void {
    this.usuarioLogado = JSON.parse(user["usuarioLogado"]);
    this.usuarioLogado = this.usuarioLogado["userResponse"]["payload"];
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title:'Atenção',
      message:'Deseja realmente excluir sua conta?'
  };
    let dialogRef = this.dialog.open(DialogElementsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.userService.delete(this.usuarioLogado.id).subscribe(() => {
          this.userService.showMessage('Usuário Excluido com sucesso!')
          this.router.navigate(['']);
        })
      }else{
        this.router.navigate(['/post']);
      }

    });

  }


}

