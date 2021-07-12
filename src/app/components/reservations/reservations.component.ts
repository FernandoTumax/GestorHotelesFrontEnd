import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions'
import { Reservation } from '../../models/reservation'
import { RestReservationService } from '../../services/restReservation/rest-reservation.service'
import { Router } from '@angular/router'
import { CONNECTION } from '../../services/global'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  animations: [fadeIn]
})
export class ReservationsComponent implements OnInit {

  public reservation:Reservation;
  public clientReservation:any;
  public uri:any;
  public reservationLocal:any;
  public hotels:any;
  public hotel:any;
  public clients:any;
  public user:any;
  public rooms:any;
  public room =[] as any;
  public services:any;
  public service = [] as any;
  public idRoom:any;

  constructor(private restReservation:RestReservationService, private router:Router) {
    this.reservation = this.restReservation.getReservation();
    this.uri = CONNECTION.URI;
   }

  ngOnInit(): void {
    this.reservationLocal = this.restReservation.getReservation();
    console.log(this.reservationLocal._id)
    this.clients = this.reservationLocal.client;
    console.log(this.clients.apellidoCliente)
    this.hotels = this.reservationLocal.hotel;
    this.rooms = this.reservationLocal.room;
    console.log(this.rooms);
    this.rooms.forEach((elemento:any) => {
      if(elemento._id != undefined){
        this.idRoom = elemento._id;
      }
    })
    console.log(this.idRoom);
    this.services = this.reservationLocal.service;
    console.log(this.services)
    console.log(this.hotels._id + " id hotel");
    /*this.clients.forEach((element:any) => {
      this.user = element;
      console.log(this.user)
    })
    this.hotels.forEach((element:any) => {
      this.hotel = element;
    })
    this.rooms.forEach((element:any) => {
      this.room = element;
    })
    this.services.forEach((element:any) => {
      this.service = element;
    })*/
  }

  cancelarReservacion(){
    Swal.fire({
      title: '¿Estas seguro de querer cancelar la reservacion?',
      showDenyButton: true,
      confirmButtonText: `Cancelar`,
      denyButtonText: `No cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.restReservation.cancelReservation(this.reservationLocal._id, this.idRoom, this.hotels._id).subscribe((res:any) => {
          if(res){
            Swal.fire('Reservacion cancelada!', '', 'success')
            this.router.navigateByUrl('home-client')
            localStorage.removeItem('reservation')
          }
        })
      }else if(result.isDenied){
        Swal.fire('No se cancelo la reservacion', '', 'warning');
      }
    })
  }

}
