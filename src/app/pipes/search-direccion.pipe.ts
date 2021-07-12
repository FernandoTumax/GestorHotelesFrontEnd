import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDireccion'
})
export class SearchDireccionPipe implements PipeTransform {

  transform(hotels: any, search: any): any {
    if(search == undefined){
      return hotels;
    }else{
      return hotels.filter((hotel:any) => {
        return hotel.direccion.toLowerCase().includes(search.toLowerCase())
      })
    }
  }

}
