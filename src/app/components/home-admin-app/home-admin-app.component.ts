import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { fadeIn } from '../../transitions/transitions'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-admin-app',
  templateUrl: './home-admin-app.component.html',
  styleUrls: ['./home-admin-app.component.css'],
  animations: [fadeIn]
})
export class HomeAdminAppComponent implements OnInit {

  public users = [] as any;
  public hotels = [] as any;
  public search:any;
  user:any;
  name:any;

  constructor(private restUser:RestUserService, private restHotel:RestHotelService) { }

  ngOnInit(): void {
    this.listUsers()
  }

  listUsers(){
    this.restUser.getUsers().subscribe((res:any) => {
      if(res){
        this.users = res;
      }else{
        Swal.fire({
          icon: 'error',
          title: 'No se encontro ningun usuario',
          text: 'Por favor comunicate con un administrador para que verifique los usuarios ',
          footer: '<h1>comunicate con: fernandotumax11@gmail.com</h1>'
        })
      }
    }, error => console.log(error.error.message))
  }

  searchUser(){
    let nombre = document.getElementById('username')?.innerHTML;
    console.log(nombre)
  }

  obtenerHoteles(){
    this.restHotel.getHotels().subscribe((res:any) => {
      if(res){
        this.hotels = res;
        localStorage.setItem('hotels', JSON.stringify(this.hotels))
        console.log(this.hotels)
      }
    })
  }


}
