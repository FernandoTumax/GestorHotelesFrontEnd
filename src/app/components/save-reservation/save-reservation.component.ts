import { Component, OnInit, Input } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { Router } from '@angular/router';
import { Reservation } from '../../models/reservation';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { RestReservationService } from '../../services/restReservation/rest-reservation.service';
import { RestUserService } from '../../services/restUser/rest-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-save-reservation',
  templateUrl: './save-reservation.component.html',
  styleUrls: ['./save-reservation.component.css'],
  animations: [fadeIn]
})
export class SaveReservationComponent implements OnInit {

  public rooms = [] as any;
  public services = [] as any;
  public habitacion = [] as any;
  public servicio = [] as any;
  public clienteReservacion = [] as any;
  public hotels = [] as any;
  public habitaciones = [] as any;
  public servicios = [] as any;
  public hotel:any;
  public user:any;
  public reservation:Reservation;
  public idUser: any;
  public idHotel:any;
  public idRoom:any;
  public idService:any;
  public precio:any;
  public idRooms = [] as any;
  public idServices = [] as any;
  public totalAPagar = 0;

  constructor(private restReservation:RestReservationService, private router:Router, private restHotel:RestHotelService, private restUser:RestUserService) {
    this.reservation = new Reservation('','',0,0,[],[],{_id:'',nombreHotel: '', direccionHotel: ''},{_id: '',nombreCliente: '', apellidoCliente: '', emailCliente: ''})
   }

  ngOnInit(): void {
    this.hotel = JSON.parse(localStorage.getItem('hotel')!);
    this.user = JSON.parse(localStorage.getItem('user')!)
    this.clienteReservacion.push(this.user);
    this.clienteReservacion = this.reservation.client;
    this.clienteReservacion.nombreCliente = this.user.name;
    this.clienteReservacion.apellidoCliente = this.user.lastname;
    this.clienteReservacion.emailCliente = this.user.email;
    this.reservation.client = this.clienteReservacion;
    this.hotels = this.reservation.hotel;
    this.hotels.nombreHotel = this.hotel.name;
    this.hotels.direccionHotel = this.hotel.direccion;
    this.reservation.hotel = this.hotels;
    this.idUser = this.user._id;
    console.log(this.idUser + "id del usuario");
    this.idHotel = this.hotel._id;
    this.rooms = this.hotel.room;
    this.services = this.hotel.service;
  }

  clickHabitacion(room:any){
     this.habitaciones.push(room);
     this.idRooms.push(room._id);
     console.log(this.idRooms);
     console.log(this.habitaciones)
     this.idRoom = room._id
     this.totalAPagar = this.totalAPagar + room.precio
  }

  clickServicio(service:any){
    this.servicios.push(service)
    this.idServices.push(service._id);
    console.log(this.idServices);
    console.log(this.servicios)
    this.idService = service._id;
    this.totalAPagar = this.totalAPagar + service.precio
  }

  cancelar(){
    this.router.navigateByUrl('home-client');
  }

  onSubmit(){
    if(this.reservation.numeroTarjeta < 10){
      Swal.fire({
        icon: 'warning',
        title: 'El numero de tarjeta no puede ser mayor a 9 digitos'
      })
    }else{
      if(this.reservation.fechaIngreso > this.reservation.fechaSalida){
        Swal.fire({
          icon: 'warning',
          title: 'La fecha de salida no puede ser antes de la fecha de ingreso',
          showConfirmButton: true,
        })
      }else if(this.reservation.fechaIngreso < this.reservation.fechaSalida){
        if(this.idRoom === undefined || this.idRoom === null){
          Swal.fire({
            icon: 'question',
            title: 'Por favor seleccione una habitacion para su reservacion',
            confirmButtonText: `Ok`,
          })
        }else{
          this.reservation.totalPagar = this.totalAPagar;
          if(this.idService === undefined || this.idService === null){
            Swal.fire({
              icon: 'warning',
              title: 'Necesita elegir por lo menos 1 servicio',
              showConfirmButton: true,
            })
          }else{
            console.log(this.reservation.totalPagar)
            this.reservation.room = this.habitaciones;
            this.reservation.service = this.servicios;
            this.reservation.client = this.clienteReservacion;
            this.reservation.hotel._id = this.idHotel;
            this.reservation.client._id = this.idUser;
            this.restReservation.createReservation(this.reservation,this.idHotel,this.idRoom, this.idUser).subscribe((res: any) => {
              if(res){
                Swal.fire({
                  icon: 'success',
                  title: 'Reservacion realizada',
                  showConfirmButton: false,
                  timer: 5500
                })
                localStorage.removeItem('hotel')
                this.router.navigateByUrl('user')
              }
            })
          }
        }
      }
    }
  }

}
