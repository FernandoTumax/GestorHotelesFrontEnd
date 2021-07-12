import { Component, OnInit } from '@angular/core';
import { fadeIn } from './../../transitions/transitions';
import { RestUserService } from './../../services/restUser/rest-user.service';
import { RestReservationService } from './../../services/restReservation/rest-reservation.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-list-reservation-client',
  templateUrl: './list-reservation-client.component.html',
  styleUrls: ['./list-reservation-client.component.css'],
  animations: [fadeIn]
})
export class ListReservationClientComponent implements OnInit {

  public historys = [] as any;
  public user:any
  public userLogg:any;

  constructor(private restUser:RestUserService, private router:Router, private restReservation:RestReservationService) { }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.restUser.getOneUser(this.user._id).subscribe((res:any) => {
      this.userLogg = res
      console.log(this.userLogg.history)
      this.historys = this.userLogg.history;
    })

  }

  seeReservation(reservation:any){
    this.restReservation.oneReservation(reservation._id).subscribe((res:any) => {
      if(res){
        localStorage.setItem('reservation', JSON.stringify(res))
        this.router.navigateByUrl('reservations')
      }
    })
  }

}
