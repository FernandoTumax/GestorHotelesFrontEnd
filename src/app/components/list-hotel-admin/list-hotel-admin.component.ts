import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { Router } from '@angular/router';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-hotel-admin',
  templateUrl: './list-hotel-admin.component.html',
  styleUrls: ['./list-hotel-admin.component.css'],
  animations: [fadeIn]
})
export class ListHotelAdminComponent implements OnInit {

  public hotels = [] as any;
  public search:any;

  constructor(private restHotel:RestHotelService, private router:Router) { }

  ngOnInit(): void {
    this.listHotel()
  }

  listHotel(){
    this.restHotel.getHotels().subscribe((res:any) => {
      if(res){
        this.hotels = res;
        console.log(this.hotels)
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

  seeReservation(hotel:any){
    this.restHotel.getOneHotel(hotel._id).subscribe((res:any) => {
      if(res){
        localStorage.setItem('hotel', JSON.stringify(res))
        this.router.navigateByUrl('list-reservations-admin-hotel');
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
