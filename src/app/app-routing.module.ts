import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeClientComponent } from './components/home-client/home-client.component';
import { HomeAdminHotelComponent } from './components/home-admin-hotel/home-admin-hotel.component'
import { HomeAdminAppComponent } from './components/home-admin-app/home-admin-app.component'
import { SaveUserComponent } from './components/save-user/save-user.component'
import { UserComponent } from './components/user/user.component'
import { SaveHotelComponent } from './components/save-hotel/save-hotel.component'
import { SaveRoomComponent } from './components/save-room/save-room.component';
import { SaveServiceComponent } from './components/save-service/save-service.component';
import { SaveEventComponent } from './components/save-event/save-event.component'
import { HotelComponent } from './components/hotel/hotel.component';
import { RoomComponent } from './components/room/room.component';
import { EventComponent } from './components/event/event.component';
import { SaveReservationComponent } from './components/save-reservation/save-reservation.component';
import { ListReservationClientComponent } from './components/list-reservation-client/list-reservation-client.component';
import { ListReservationAdminComponent } from './components/list-reservation-admin/list-reservation-admin.component';
import { ListUserAdminComponent } from './components/list-user-admin/list-user-admin.component';
import { GraphicsHotelsComponent } from './components/graphics-hotels/graphics-hotels.component';
import { ListHotelAdminComponent } from './components/list-hotel-admin/list-hotel-admin.component';
import { ListReservationsAdminComponent } from './components/list-reservations-admin/list-reservations-admin.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { AdminAppGuard } from './guards/adminapp/admin-app.guard';
import { AdminHotelGuard } from './guards/adminhotel/admin-hotel.guard';
import { ClientGuard } from './guards/client/client.guard';
import { LoggedGuard } from './guards/logged/logged.guard';
import { LoggedOutGuard } from './guards/loggedOut/logged-out.guard';
import { HotelAdminGuard } from './guards/hotelAdminn/hotel-admin.guard'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'register',canActivate:[LoggedOutGuard], component: RegisterComponent},
  {path: 'login', canActivate: [LoggedOutGuard], component: LoginComponent},
  {path: 'home-client', canActivate:[ClientGuard], component: HomeClientComponent},
  {path: 'home-admin-hotel',canActivate:[AdminHotelGuard],  component: HomeAdminHotelComponent},
  {path: 'home-admin-app', canActivate:[AdminAppGuard], component: HomeAdminAppComponent},
  {path: 'save-user', canActivate: [AdminAppGuard], component: SaveUserComponent},
  {path: 'user', canActivate:[LoggedGuard], component: UserComponent},
  {path: 'save-hotel', canActivate: [AdminAppGuard], component: SaveHotelComponent},
  {path: 'save-room', canActivate: [HotelAdminGuard], component: SaveRoomComponent},
  {path: 'save-service', canActivate: [HotelAdminGuard], component: SaveServiceComponent},
  {path: 'save-event', canActivate: [HotelAdminGuard], component: SaveEventComponent},
  {path: 'hotel', canActivate: [LoggedGuard], component: HotelComponent},
  {path: 'room', canActivate: [LoggedGuard], component: RoomComponent},
  {path: 'event', canActivate: [LoggedGuard], component: EventComponent},
  {path: 'save-reservation', canActivate: [ClientGuard], component: SaveReservationComponent},
  {path: 'list-reservation', canActivate: [ClientGuard], component: ListReservationClientComponent},
  {path: 'list-reservation-admin', canActivate: [AdminHotelGuard], component: ListReservationAdminComponent},
  {path: 'list-user-admin', canActivate:[AdminHotelGuard], component: ListUserAdminComponent},
  {path: 'graphics-hotels', canActivate: [AdminAppGuard], component: GraphicsHotelsComponent},
  {path: 'list-hotel-admin', canActivate: [AdminAppGuard], component: ListHotelAdminComponent},
  {path: 'list-reservations-admin-hotel', canActivate: [AdminAppGuard], component: ListReservationsAdminComponent},
  {path: 'reservations', canActivate:[ClientGuard], component: ReservationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
