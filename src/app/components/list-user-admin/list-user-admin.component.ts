import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../transitions/transitions';
import { RestUserService } from '../../services/restUser/rest-user.service'
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user-admin',
  templateUrl: './list-user-admin.component.html',
  styleUrls: ['./list-user-admin.component.css'],
  animations: [fadeIn]
})
export class ListUserAdminComponent implements OnInit {

  public users = {} as any;
  public hotel:any;
  public search:any;
  public clientes= [] as any;

  constructor(private restHotel:RestHotelService, private restUser:RestUserService, private router:Router) { }

  ngOnInit(): void {
    this.hotel = this.restHotel.getHotel();
    this.users = this.hotel.reservation;
    this.users.forEach((elemento:any) => {
      this.clientes.push(elemento.client)
      
    })
    console.log(this.clientes)


  }

}
