import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-admin-hotel',
  templateUrl: './home-admin-hotel.component.html',
  styleUrls: ['./home-admin-hotel.component.css'],
  animations: [fadeIn]
})
export class HomeAdminHotelComponent implements OnInit {

  public hotels = {} as any;
  public user:any;
  public search:any;

  constructor(private restUser:RestUserService, private router:Router, private restHotel:RestHotelService) { }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.hotels = this.user.hotels;
    console.log(this.hotels)
  }

  searchHotel(){
    let nombreHotel = document.getElementById('idHotel')?.innerHTML;
    this.restHotel.getOneHotel(nombreHotel).subscribe((res:any) => {
      if(res){
        localStorage.setItem('hotel', JSON.stringify(res));
        console.log(nombreHotel);
        this.router.navigateByUrl('hotel');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'No se encontro ningun hotel',
          text: 'Por favor comunicate con un administrador para que verifique los hoteles ',
          footer: '<h1>comunicate con: fernandotumax11@gmail.com</h1>'
        })
      }
    })
  }

}
