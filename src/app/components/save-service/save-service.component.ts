import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../models/service'
import { fadeIn } from '../../transitions/transitions'
import { RestServiceService } from '../../services/restService/rest-service.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-save-service',
  templateUrl: './save-service.component.html',
  styleUrls: ['./save-service.component.css'],
  animations: [fadeIn]
})
export class SaveServiceComponent implements OnInit {

  public service:Service;
  public idHotel:any;

  constructor(private restService:RestServiceService, private router:Router) {
    this.service = new Service('',0,'');
   }

  ngOnInit(): void {
    this.idHotel = JSON.parse(localStorage.getItem('hotel')!)
  }

  cancelar(){
    this.router.navigateByUrl('hotel');
  }

  onSubmit(saveService:any){
    this.restService.saveService(this.service, this.idHotel._id).subscribe((res:any) => {
      if(res){
        Swal.fire({
          title: '¿Quieres crear otro Servicio?',
          showDenyButton: true,
          confirmButtonText: `Crear`,
          denyButtonText: `No quiero crear`,
        }).then((result) => {
          if(result.isConfirmed){
            saveService.reset();
          }else if(result.isDenied){
            Swal.fire({
              title: '¿Quieres crear un evento?',
              showDenyButton: true,
              confirmButtonText: `Crear`,
              denyButtonText: `Regresar al home`,
            }).then((result) => {
              if(result.isConfirmed){
                localStorage.setItem('service', JSON.stringify(res))
                this.router.navigateByUrl('save-event')
              }else if(result.isDenied){
                Swal.fire('Vuelva pronto :D', '', 'info')
                localStorage.removeItem('hotel')
                localStorage.removeItem('room')
                this.router.navigateByUrl('home-admin-app')
              }
            })
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'El servicio no se pudo crear correctamente',
          text: 'Por favor comunicate con un desarrollador de la pagina',
          footer: '<h1>Comunicate con: fernandotumax11@gmail.com</h1>'
        })
      }
    }, error => console.log(<any>error))
  }

}
