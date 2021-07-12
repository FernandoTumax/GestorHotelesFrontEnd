  import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions'
import { User } from '../../models/user';
import { RestUserService } from '../../services/restUser/rest-user.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeIn]
})
export class LoginComponent implements OnInit {
  public user:User;
  public token:any;
  public userLogged:any;


  constructor(private restUser:RestUserService, private router:Router) {
    this.user = new User('','','','','','',[],[],[])
   }

  ngOnInit(): void {
  }

  onSubmit(login:any){
    this.restUser.login(this.user).subscribe((res:any) => {
      if(!res.token){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No reconocemos su token para entrar a este sitio',
          footer: '<h1>¿Estas seguro que es tu cuenta?</h1>'
        })
      }else{
        this.userLogged = res.user;
        this.token = res.token;
        delete this.userLogged.password;
        if(this.token.length < 0){
          Swal.fire({
            icon: 'error',
            title: 'Token no generado :(',
            text: 'lo sentimos pero tu token no fue generado, intenta probar de nuevo',
            footer: '<h1>¿Sigues sin entrar? comunicate con: fernandotumax11@gmail.com</h1>'
          })
          login.reset();
        }else{
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(this.userLogged));
          Swal.fire({
            icon: 'success',
            title: 'Usuario logeado de forma correcta',
            showConfirmButton: true,
            timer: 5500
          })
          if(this.userLogged.rol === "ROL_CLIENT"){
            this.router.navigateByUrl('user')
          }else if(this.userLogged.rol === "ROL_ADMINAPP"){
            this.router.navigateByUrl('home-admin-app')
          }else if(this.userLogged.rol === "ROL_ADMINHOTEL"){
            this.router.navigateByUrl('home-admin-hotel')
          }else{
            Swal.fire({
              icon: 'error',
              title: 'El rol de este usuario no coinciden con los del requisito',
              text: 'Por favor comunicate con un administrador para que te modifique tu rol ',
              footer: '<h1>comunicate con: fernandotumax11@gmail.com</h1>'
            })
          }
        }
      }
    })
  }

}
