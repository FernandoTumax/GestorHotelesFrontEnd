import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  animations: [fadeIn]
})
export class EventComponent implements OnInit {

  public events = [] as any;
  public hotel:any;

  constructor(private restHotel:RestHotelService, private router:Router) { }

  ngOnInit(): void {
    this.hotel = this.restHotel.getHotel();
    this.events = this.hotel.event;
    console.log(this.events._id)
    console.log(this.events)
  }

}
