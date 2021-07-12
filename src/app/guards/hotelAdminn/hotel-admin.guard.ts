import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestUserService } from '../../services/restUser/rest-user.service'

@Injectable({
  providedIn: 'root'
})
export class HotelAdminGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this.restUser.getUser()
    if(user.rol = 'ROL_ADMINAPP' || user.rol == 'ROL_ADMINHOTEL'){
      return true
    }else{
      let token = this.restUser.getToken()
      if(token){
        this.router.navigateByUrl('home-client')
      return false
      }else{
        this.router.navigateByUrl('home')
        return false
      }
    }
  }
  
  constructor(private restUser:RestUserService, private router:Router){}

}
