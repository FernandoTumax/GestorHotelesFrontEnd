export class Reservation{
    constructor(
        public fechaIngreso:string,
        public fechaSalida:string,
        public numeroTarjeta:number,
        public totalPagar:number,
        public room:[],
        public service:[],
        public hotel:{
            _id: string,
            nombreHotel:string,
            direccionHotel:string
        },
        public client:{
            _id: string,
            nombreCliente: string,
            emailCliente: string,
            apellidoCliente: string,
        }
    ){}
}