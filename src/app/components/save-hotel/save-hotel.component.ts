import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from '../../models/hotel';
import { User } from '../../models/user';
import { fadeIn } from '../../transitions/transitions'
import { RestUserService } from '../../services/restUser/rest-user.service';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-save-hotel',
  templateUrl: './save-hotel.component.html',
  styleUrls: ['./save-hotel.component.css'],
  animations: [fadeIn]
})
export class SaveHotelComponent implements OnInit {
  public adminsNombre = [] as any;
  public admins= [] as any;
  public idAdmin:any;
  public hotel:Hotel;
  public user:User;
  public adminHotel:any;

  constructor(private restUser:RestUserService, private router:Router, private restHotel:RestHotelService){
      this.user = new User('','','','','','',[],[],[]);  
    this.hotel = new Hotel('','',0,[],[],[],[],[],[]);
   }


  ngOnInit(): void {
    this.restUser.getUsersAdminHotel().subscribe((res:any) => {
      if(res){
        res.forEach((element:any) => {
          element.forEach((elementoAdmin:any) => {
            this.admins.push(elementoAdmin)
            localStorage.setItem('adminHotels', JSON.stringify(this.admins))
            this.adminsNombre.push(elementoAdmin.name)
          })
        })
      }else{
        alert("hola")
        this.router.navigateByUrl('home-admin-app')
      }
    })
  }

  cancelar(){
    this.router.navigateByUrl('hotel');
  }

  onSubmit(saveHotel:any){
    let adminId = JSON.parse(localStorage.getItem('adminHotels')!)
    adminId.forEach((elemento:any) => {
      if(elemento.name.includes(this.idAdmin)){
        this.adminHotel = elemento._id;
      }
    })
    console.log(this.hotel)
    this.restHotel.saveHotel(this.hotel, this.adminHotel).subscribe((res:any) => {
      if(res){
        Swal.fire({
          title: '¿Quieres crear otro hotel?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Crear`,
          denyButtonText: `No quiero crear otro`,
        }).then((result) => {
          if (result.isConfirmed) {
            saveHotel.reset()
          } else if (result.isDenied) {
            Swal.fire({
              title: '¿Desea pasar a crear una habitacion?',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: `crear`,
              denyButtonText: `Regresar al home`,
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.setItem('hotel', JSON.stringify(res))
                this.router.navigateByUrl('save-room')
              } else if (result.isDenied) {
                Swal.fire('Vuelva pronto :D', '', 'info')
              this.router.navigateByUrl('home-admin-app')
              }
            })
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'El hotel no se pudo crear correctamente',
          text: 'Por favor comunicate con un desarrollador de la pagina',
          footer: '<h1>comunicate con: fernandotumax11@gmail.com</h1>'
        })
      }
    }, error => console.log(<any>error))

  }


}
