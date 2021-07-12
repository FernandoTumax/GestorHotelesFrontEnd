import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { RestReservationService } from '../../services/restReservation/rest-reservation.service'
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-list-reservations-admin',
  templateUrl: './list-reservations-admin.component.html',
  styleUrls: ['./list-reservations-admin.component.css'],
  animations: [fadeIn]
})
export class ListReservationsAdminComponent implements OnInit {

  public reservations = {} as any;
  public hotel:any;

  constructor(private restHotel:RestHotelService, private router:Router, private restReservation:RestReservationService) { }

  ngOnInit(): void {
    this.hotel = this.restHotel.getHotel();
    this.reservations = this.hotel.reservation;
    console.log(this.reservations)
  }

  seeReservations(reservation:any){
    localStorage.setItem('reservation', JSON.stringify(reservation))
    this.router.navigateByUrl('reservations')
  }

}
