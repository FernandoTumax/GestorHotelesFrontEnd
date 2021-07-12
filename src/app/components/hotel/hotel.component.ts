import { Component, OnInit, DoCheck } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { Hotel } from '../../models/hotel';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service'
import { RestUserService } from '../../services/restUser/rest-user.service'
import { CONNECTION } from '../../services/global';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
  animations: [fadeIn]
})
export class HotelComponent implements OnInit, DoCheck {

  public hotel:Hotel;
  public token:any;
  public uri:any;
  public user:any;
  public hotelExisting:any;
  public rooms:any;
  public idRooms = [] as any;

  constructor(private restHotel:RestHotelService, private router:Router, private restUser:RestUserService) {
    this.hotel = this.restHotel.getHotel();
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.uri = CONNECTION.URI;
   }

  ngOnInit(): void {
    this.hotelExisting = JSON.parse(localStorage.getItem('hotel')!)
    this.rooms = this.hotelExisting.room;
    
    console.log(this.idRooms.length)
  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser(); 
  }

  reservation(){
    this.rooms.forEach((elemento:any) => {
      if(elemento.disponibilidad == 'disponible'){
        this.idRooms.push(elemento.disponibilidad)
      }
    })
    if(this.idRooms.length > 0){
      this.router.navigateByUrl('save-reservation')
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todas las habitaciones estan ocupadas',
      })
    }
  }

  saveRoom(){
    this.router.navigateByUrl('save-room')
  }

  saveService(){
    this.router.navigateByUrl('save-service')
  }

  saveEvent(){
    this.router.navigateByUrl('save-event')
  }

}
