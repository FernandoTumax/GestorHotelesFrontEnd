import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { User } from '../../models/user';
import { RestUserService } from '../../services/restUser/rest-user.service'
import { Router } from '@angular/router'
import { CONNECTION } from '../../services/global'
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeIn]
})
export class UserComponent implements OnInit {

  public user:User;
  public token:any;
  public uri:any;
  public userLogg:any;
  public userBack:any;

  constructor(private restUser:RestUserService, private router:Router) {
    this.user = this.restUser.getUser();
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.userLogg = JSON.parse(localStorage.getItem('user')!);
    this.restUser.getOneUser(this.userLogg._id).subscribe((res:any) => {
      this.userBack = this.userLogg;
    })
  }

  onSubmit(){
    this.restUser.updateUser(this.user, this.userLogg._id).subscribe((res:any) => {
      if(res){
        delete res.password;
        localStorage.setItem('user', JSON.stringify(res))
        Swal.fire({
          icon: 'success',
          title: 'Usuario Modificado de forma correcta',
          showConfirmButton: true,
          timer: 5500
        })
        this.router.navigateByUrl('user')
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El nombre de este usuario ya existe!',
          footer: '<a href>¿Ya tienes una cuenta?</a>'
        })
      }
    }, error => console.log(<any>error))

  }
  deleteUser(){
    Swal.fire({
      title: '¿Estas seguro de querer eliminar esta cuenta?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.restUser.deleteUser(this.userLogg._id).subscribe((res:any) => {
          if(res){
            Swal.fire('Cuenta eliminda!', '', 'success')
            this.router.navigateByUrl('home')
            localStorage.clear()
          }
        }, error => console.log(<any>error))
      } else if (result.isDenied) {
        Swal.fire('No se elimino la cuenta', '', 'info')
      }
    })
  }

}
