import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../models/event';
import { fadeIn } from '../../transitions/transitions'
import { RestEventService } from '../../services/restEvent/rest-event.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-save-event',
  templateUrl: './save-event.component.html',
  styleUrls: ['./save-event.component.css'],
  animations: [fadeIn]
})
export class SaveEventComponent implements OnInit {
  public event:Event;
  public hotel:any;

  constructor(private restEvent:RestEventService, private router:Router) {
    this.event = new Event('','','','');
   }

  ngOnInit(): void {
    this.hotel = JSON.parse(localStorage.getItem('hotel')!);
  }

  cancelar(){
    this.router.navigateByUrl('hotel');
  }

 onSubmit(saveEvent:any){
    let horarioInput = this.event.horario;
    
    this.restEvent.saveEvent(this.event, this.hotel._id).subscribe((res:any) => {
      if(res){
        Swal.fire({
          title: '¿Quieres crear otro evento?',
          showDenyButton: true,
          confirmButtonText: `Crear`,
          denyButtonText: `No quiero crear`
        }).then((result) => {
          if(result.isConfirmed){
            saveEvent.reset()
          }else if(result.isDenied){
            Swal.fire({
              icon: 'success',
              title: 'Evento creado de forma correcta',
              showConfirmButton: true,
              timer: 5500
            })
            localStorage.removeItem('hotel');
            localStorage.removeItem('room');
            localStorage.removeItem('service');
            this.router.navigateByUrl('home')
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'El evento no se pudo crear correctamente',
          text: 'Por favor comunicate con un desarrollador de la pagina',
          footer: '<h1>comunicate con: fernandotumax11@gmail.com</h1>'
        })
      }
    }, error => console.log(<any>error))
 }

}
