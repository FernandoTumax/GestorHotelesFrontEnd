import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from './../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {
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

  public user:any;
  public token:any;
  
  private extractData(res: any){
    let body = res;
    return body || [] || {};
  }

  constructor(private http:HttpClient) {
    this.uri = CONNECTION.URI;
   }

   getUser(){
     let user =  JSON.parse(localStorage.getItem('user')!);
     if(user != undefined || user != null){ 
        this.user = user
     }else{
       this.user = null;
     }

     return this.user;
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

   register(user:any){
     let params = JSON.stringify(user);
     return this.http.post(this.uri+'usuarios/create', params, this.httpOptions)
     .pipe(map(this.extractData));
   }

   login(user:any){
     let params = JSON.stringify(user);
     return this.http.post(this.uri+'usuarios/login', params, this.httpOptions).pipe(map(this.extractData))
   }

   updateUser(user:any, idUser:any){
    let params = JSON.stringify(user);
    return this.http.put(this.uri+`usuarios/${idUser}`, params, this.httpOptionsAuth).pipe(map(this.extractData))
   }

   deleteUser(idUser:any){
     return this.http.delete(this.uri+`usuarios/${idUser}`, this.httpOptionsAuth).pipe(map(this.extractData))
   }
   
   getOneUser(idUser:any){
     return this.http.get(this.uri+`usuarios/oneUser/${idUser}`, this.httpOptionsAuth).pipe(map(this.extractData))
   }

   getUsersAdminHotel(){
    return this.http.get(this.uri + 'usuarios/adminHotel', this.httpOptionsAuth).pipe(map(this.extractData))
   }

   getUsers(){
     return this.http.get(this.uri + 'usuarios/', this.httpOptionsAuth).pipe(map(this.extractData))
   }

}
