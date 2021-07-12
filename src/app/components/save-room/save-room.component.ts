import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../../models/room';
import { fadeIn } from '../../transitions/transitions';
import { RestRoomService } from '../../services/restRoom/rest-room.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-save-room',
  templateUrl: './save-room.component.html',
  styleUrls: ['./save-room.component.css'],
  animations: [fadeIn]
})
export class SaveRoomComponent implements OnInit {

  public hotel:any;
  public optionRoom = ['VIP', 'Suite', 'Normal'];
  public room:Room;

  constructor(private restRoom:RestRoomService, private router:Router) { 
    this.room = new Room('','disponible','','',0)
  }

  ngOnInit(): void {
    this.hotel =  JSON.parse(localStorage.getItem('hotel')!); 
  }
  
  cancelar(){
    this.router.navigateByUrl('hotel');
  }

  onSubmit(saveRoom:any){
    this.restRoom.saveRoom(this.room, this.hotel._id).subscribe((res:any) => {
      if(res){
        Swal.fire({
          title: '¿Quieres crear otra habitacion?',
          showDenyButton: true,
          confirmButtonText: `Crear`,
          denyButtonText: `No quiero crear`,
        }).then((result) => {
          if (result.isConfirmed) {
            saveRoom.reset()
          } else if (result.isDenied) {
            Swal.fire({
              title: '¿Quieres crear un servicio?',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: `Crear`,
              denyButtonText: `Regresar al home`,
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.setItem('room', JSON.stringify(res))
                this.router.navigateByUrl('save-service')
              } else if (result.isDenied) {
                Swal.fire('Vuelva Pronto :D', '', 'info')
                localStorage.removeItem('hotel')
                this.router.navigateByUrl('home-admin-app')
              }
            })
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'la habitacion no se pudo crear correctamente',
          text: 'Por favor comunicate con un desarrollador de la pagina',
          footer: '<h1>comunicate con: fernandotumax11@gmail.com</h1>'
        })
      }
    }, error => console.log(<any>error))
  }

}
