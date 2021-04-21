import { AuthorizationService } from 'src/app/authorization';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  user: User;

  old_passwordError: string = '';

  formulario: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  //na inicialização do meu componente, ja vai entrar e estar com os dados do usuario logado.
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.userService.readById(id).subscribe(user => {
      this.user = user;

      this.criarFormularioDeUsuario();
    });

    this.enviaUsuario(sessionStorage);

  }

  enviarDados() {
    const dadosFormulario = this.formulario.value;

    const usuario = (
      dadosFormulario.usuarioLogado.name,
      dadosFormulario.usuarioLogado.username,
      dadosFormulario.usuarioLogado.email,
      dadosFormulario.usuarioLogado.new_password,
      dadosFormulario.usuarioLogado.old_password
    );

    alert(`O usuário ${usuario.name} foi editado com sucesso. \n Dados: ${JSON.stringify(usuario)}`);
    this.formulario.reset();
  }

  criarFormularioDeUsuario() {

    this.formulario = this.fb.group({
      name: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ])],

        username: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ])],

        email: ['', Validators.compose([Validators.email])],

      new_password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255)
        ])
      ],

      old_password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255)
        ])
      ],
      // confirmarSenha: ['', Validators.compose([Validators.required])]
    },
      {
        // validator: Validacoes.SenhasCombinam
      }
    );
  }
  get name() {
    return this.formulario.get('name');
  }
  get username() {
    return this.formulario.get('username');
  }
  get email() {
    return this.formulario.get('email');
  }
  get new_password() {
    return this.formulario.get('new_password');
  }
  get old_password() {
    return this.formulario.get('old_password');
  }


  updateUser(): void {
    this.userService.update(this.usuarioLogado).subscribe(() => {
    if(this.userService.verifyExistenceCredentials(this.usuarioLogado.email)){
      this.userService.showMessage('Usuario atualizado com sucesso!')
      this.router.navigate(['/post']);
    } else{
      this.old_passwordError = "Senha atual errada!"

    }
      // this.userService.showMessage('Usuario atualizado com sucesso!')
      //  this.router.navigate(['/post']);
    },
    err => {
      console.log('error: ', err);
      this.old_passwordError = "Senha atual errada!";
    },
    () => console.log('HTTP request completed.')
    )
    
  }




  cancel(): void {
    this.router.navigate(['/post']);

  }

  @Input() usuarioLogado: User;
  enviaUsuario(user: Storage): void {
    this.usuarioLogado = JSON.parse(user["usuarioLogado"]);
    this.usuarioLogado = this.usuarioLogado["userResponse"]["payload"];
  }

}
