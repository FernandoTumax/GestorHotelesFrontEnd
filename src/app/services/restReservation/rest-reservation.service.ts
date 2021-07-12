import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestReservationService {
  public uri:string;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
  }

  public token:any;
  public hotel:any;
  public reservation:any;

  private extractData(res:any){
    let body = res;
    return body || [] || {};
  }

  constructor(private http: HttpClient) { 
    this.uri = CONNECTION.URI
  }

  getHotel(){
    let hotel = JSON.parse(localStorage.getItem('hotel')!);
    if(hotel != undefined || hotel != null){
      this.hotel = hotel;
    }else{
      this.hotel = null;
    }

    return this.hotel;
  }

  getReservation(){
    let reservation = JSON.parse(localStorage.getItem('reservation')!);
    if(reservation != undefined || reservation != null){
      this.reservation = reservation;
    }else{
      this.reservation = null;
    }

    return this.reservation;

  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != undefined || token != null){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;

  }

  
  createReservation(reservation:any, hotel:any, room:any, client:any){
    console.log(reservation);
    let params = JSON.stringify(reservation);
    console.log("hola");
    return this.http.post(this.uri+`reservaciones/${hotel}/${room}/${client}/set`, params, this.httpOptionsAuth)
      .pipe(map(this.extractData))
  }

  cancelReservation(idReservacion:any, idRoom:any, idHotel:any){
    return this.http.delete(this.uri+`reservaciones/${idReservacion}/${idRoom}/${idHotel}`, this.httpOptionsAuth).pipe(map(this.extractData))
  }

  oneReservation(idReservation:any){
    return this.http.get(this.uri+`reservaciones/oneReservation/${idReservation}`, this.httpOptionsAuth).pipe(map(this.extractData))
  }

  roomDisp(idRoom:any){
    return this.http.put(this.uri+`reservaciones/roomDisp/${idRoom}`, this.httpOptionsAuth).pipe(map(this.extractData))
  }

  roomOcup(idRoom:any){
    return this.http.put(this.uri+`reservaciones/roomOcup/${idRoom}`, this.httpOptionsAuth).pipe(map(this.extractData))
  }

}
