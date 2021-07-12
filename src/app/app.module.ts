import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeClientComponent } from './components/home-client/home-client.component';
import { HomeAdminHotelComponent } from './components/home-admin-hotel/home-admin-hotel.component';
import { HomeAdminAppComponent } from './components/home-admin-app/home-admin-app.component';
import { SaveUserComponent } from './components/save-user/save-user.component';
import { UserComponent } from './components/user/user.component';
import { SaveHotelComponent } from './components/save-hotel/save-hotel.component';

import { RestUserService } from './services/restUser/rest-user.service';
import { RestHotelService } from './services/restHotel/rest-hotel.service';
import { SaveRoomComponent } from './components/save-room/save-room.component';
import { SaveServiceComponent } from './components/save-service/save-service.component';
import { SaveEventComponent } from './components/save-event/save-event.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { RoomComponent } from './components/room/room.component';
import { EventComponent } from './components/event/event.component';
import { SearchPipe } from './pipes/search.pipe';
import { SaveReservationComponent } from './components/save-reservation/save-reservation.component';
import { ListReservationClientComponent } from './components/list-reservation-client/list-reservation-client.component';
import { ListReservationAdminComponent } from './components/list-reservation-admin/list-reservation-admin.component';
import { ListUserAdminComponent } from './components/list-user-admin/list-user-admin.component';
import { GraphicsHotelsComponent } from './components/graphics-hotels/graphics-hotels.component';
import { ListHotelAdminComponent } from './components/list-hotel-admin/list-hotel-admin.component';
import { ListReservationsAdminComponent } from './components/list-reservations-admin/list-reservations-admin.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { SearchDireccionPipe } from './pipes/search-direccion.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeClientComponent,
    HomeAdminHotelComponent,
    HomeAdminAppComponent,
    SaveUserComponent,
    UserComponent,
    SaveHotelComponent,
    SaveRoomComponent,
    SaveServiceComponent,
    SaveEventComponent,
    HotelComponent,
    RoomComponent,
    EventComponent,
    SearchPipe,
    SaveReservationComponent,
    ListReservationClientComponent,
    ListReservationAdminComponent,
    ListUserAdminComponent,
    GraphicsHotelsComponent,
    ListHotelAdminComponent,
    ListReservationsAdminComponent,
    ReservationsComponent,
    SearchDireccionPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [RestUserService, RestHotelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
