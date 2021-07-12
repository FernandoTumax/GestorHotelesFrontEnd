import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { User } from '../../models/user'
import { RestUserService } from '../../services/restUser/rest-user.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css'],
  animations: [fadeIn]
})
export class SaveUserComponent implements OnInit {
  public user:User;
  public optionsRol = ['ROL_ADMINHOTEL', 'ROL_ADMINAPP', 'ROL_CLIENT'];
  public userLogg:any;
  public token:any;

  constructor(private restUser:RestUserService, private router:Router) {
    this.user = new User('','','','','','',[],[],[]);
    this.token = this.restUser.getToken();
    this.userLogg = this.restUser.getUser();
   }

  ngOnInit(): void {
  }

  cancelar(){
    this.router.navigateByUrl('home-admin-app');
  }

  onSubmit(create:any){
    this.restUser.register(this.user).subscribe((res:any) => {
      if(res){
        Swal.fire({
          icon: 'success',
          title: 'Usuario Creado de forma correcta',
          showConfirmButton: true,
          timer: 5500
      });
      create.reset();
      this.router.navigateByUrl('home-admin-app');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El nombre de este usuario ya existe!',
          footer: '<a routerLink="/login" routerLinkActivate="active">¿Ya tienes una cuenta?</a>'
        })
      }
    }, error => console.log(<any>error))
  }

}
