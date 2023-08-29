import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpServiceService} from '../http-service.service';
import { Order } from '../models/order.model';
import { AuthentificationService } from './authentification.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartServiceEvent = new BehaviorSubject({});
  public CmdServiceEvent = new BehaviorSubject({});
  public proerviceEvent = new BehaviorSubject({});

  cartQty = 0;
  cartObj:any=[];
  cmdtaille=0;
  commandes:any=[];
 public cartTotalPrice :any;
 userId:any
 orderId:any
products:any=[];
orders:any=[];
  constructor(
    private http:HttpServiceService,
    //  private http:HttpClient, 
     private httpclient:HttpClient, 
     private auth:AuthentificationService
     ) {}
   private baseUrl="localhost:8080/api/order/"

   getAll(): Observable<any> {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer '+this.auth.getToken()
      })
    };
    this.http.postRequestWithToken("api/order/",{}).subscribe((data:any)=>{
      console.log("data",data);
      this.orders=data;
      return(data);
     },error=>{
       return("Error while fetching the cart Details");
     })
     return (this.orders);
  }
}
