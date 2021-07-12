import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service'
import { fadeIn } from '../../transitions/transitions'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css'],
  animations: [fadeIn]
})
export class HomeClientComponent implements OnInit {

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
    }, error => console.log(<any>error))
  }

  searchHotel(hotel:any){
    //let nombreHotel = document.getElementById('idHotel')?.innerHTML;
    this.restHotel.getOneHotel(hotel._id).subscribe((res:any) => {
      if(res){
        localStorage.setItem('hotel', JSON.stringify(res));
        console.log(hotel._id);
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
