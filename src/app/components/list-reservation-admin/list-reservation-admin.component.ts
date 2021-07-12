import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { RestReservationService } from '../../services/restReservation/rest-reservation.service'
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-reservation-admin',
  templateUrl: './list-reservation-admin.component.html',
  styleUrls: ['./list-reservation-admin.component.css'],
  animations: [fadeIn]
})
export class ListReservationAdminComponent implements OnInit {

  public reservations = {} as any;
  public hotel:any;

  constructor(private restHotel:RestHotelService, private router:Router, private restReservation:RestReservationService) { }

  ngOnInit(): void {
    this.hotel = this.restHotel.getHotel();
    this.reservations = this.hotel.reservation;
    console.log(this.reservations)
  }

}
