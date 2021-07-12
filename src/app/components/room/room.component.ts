import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  animations: [fadeIn]
})
export class RoomComponent implements OnInit {

    public rooms = [] as any;
    public hotel:any;
    public user:any;

  constructor( private restHotel:RestHotelService, private router:Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!)
    this.hotel = JSON.parse(localStorage.getItem('hotel')!);
    this.rooms = this.hotel.room;
    console.log(this.rooms)
  }

}
