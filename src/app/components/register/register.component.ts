import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { User } from '../../models/user';
import { RestUserService } from '../../services/restUser/rest-user.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeIn]
})
export class RegisterComponent implements OnInit {
  public user:User;


  constructor(private restUser:RestUserService, private router:Router) {
    this.user = new User('','','','','','ROL_CLIENT',[],[],[]);
   }

  ngOnInit(): void {
  }

  onSubmit(register:any){
    this.restUser.register(this.user).subscribe((res:any) => {
      if(res){
        Swal.fire({
            icon: 'success',
            title: 'Usuario Registrado de forma correcta',
            showConfirmButton: true,
            timer: 5500
        })
        register.reset();
        this.router.navigateByUrl('login')
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El nombre de este usuario ya existe!',
          footer: '<a href>¿Ya tienes una cuenta?</a>'
        })
      }
    }, error => console.log(<any>error));

  }

}
