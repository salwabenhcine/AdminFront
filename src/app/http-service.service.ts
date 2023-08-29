import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
import { map, filter, scan,catchError,tap } from 'rxjs/operators';
import { AuthentificationService } from './authentification.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { User } from './models/user';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  url = "http://localhost:8083/";
private user!:User
orderId:any
  constructor(private http: HttpClient, private auth:AuthentificationService) { }

  postRequestWithToken(url:string,param:any){
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer '+this.auth.getToken()
      })
    };
    // param['userId'] =this.auth.getEmail();
    return this.http.get(this.url+url,httpOptionsWithToken);
  }

  }
