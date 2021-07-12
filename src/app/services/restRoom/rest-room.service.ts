import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RestRoomService {
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

  private extractData(res:any){
    let body = res;
    return body || [] || {};
  }

  constructor(private http: HttpClient) {
    this.uri = CONNECTION.URI
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

   saveRoom(room:any, idHotel:any){
    let params = JSON.stringify(room)
    return this.http.post(this.uri+`habitaciones/${idHotel}/create`, params, this.httpOptionsAuth).pipe(map(this.extractData))
   }


}
