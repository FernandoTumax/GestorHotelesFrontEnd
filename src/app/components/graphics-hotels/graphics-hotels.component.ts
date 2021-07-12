import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js'
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { fadeIn } from '../../transitions/transitions'
import { Label, Color } from 'ng2-charts'
import { RestHotelService } from '../../services/restHotel/rest-hotel.service'



@Component({
  selector: 'app-graphics-hotels',
  templateUrl: './graphics-hotels.component.html',
  styleUrls: ['./graphics-hotels.component.css'],
  animations: [fadeIn]
})
export class GraphicsHotelsComponent implements OnInit {

  public barChartOptions: Chart.ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: Chart.ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public chartColors = [] as any;
  public nombres = [] as any;
  public barChartData: any[] = [];
  public solicitud = [] as any;
  public hotels = [] as any;
  public nameHotels = JSON.parse(localStorage.getItem('hotels')!);
  public solicitudHotels = [] as any;

  constructor(private restHotel:RestHotelService) {
   }


  ngOnInit(): void {
    this.hotels =  this.restHotel.getHotel()
    this.nameHotels.forEach((element:any) => {
      this.barChartLabels.push(element.name)
      console.log(element)
      this.barChartData.push({data: element.solicitud, label: "SOLICITUDES"})
      this.nombres.push(element.name);
      this.solicitud.push(element.solicitud);
    })
    this.chartColors.push({backgroundColor: '#b3fee2'})
    /*this.barChartLabels.push(this.nameHotels)
    this.barChartData.push({data: this.solicitudHotels, label: this.hotels.name})*/
    
  }

  ensenarEstadistica(){
    for (let i = 0; i < this.solicitud.length; i++){
      this.barChartData.push({data: this.solicitud[i], label: this.nombres[i]})
    }
  }



  

}
