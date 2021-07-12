import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class RestHotelService {
  public uri:string;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  public httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
  }

  public token:any;
  public hotel:any;
  
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

   getToken(){
     let token = localStorage.getItem('token');
     if(token != undefined || token != null){
       this.token = token;
     }else{
       this.token = null;
     }

     return this.token;
   }


   saveHotel(hotel:any, idAdmin:any){
     console.log(hotel);
    let params = JSON.stringify(hotel)
    console.log(params);
    return this.http.post(this.uri+'hoteles/create/'+idAdmin, params, this.httpOptionsAuth).pipe(map(this.extractData))
   }

   getHotels(){
     return this.http.get(this.uri+'hoteles/', this.httpOptionsAuth).pipe(map(this.extractData))
   }

   getOneHotel(idHotel:any){
      return this.http.get(this.uri+`hoteles/oneHotel/${idHotel}`, this.httpOptionsAuth).pipe(map(this.extractData))
   }

}
