import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
API ="http://localhost:8083";

requestHeader = new HttpHeaders(
{ 'No-Auth':'True'}
);
  constructor(private httpclient: HttpClient, private auth:AuthentificationService) { }

  public login(email:string,password:string){
    return this.httpclient.post(this.API + "/authenticate",{email,password}
    ,{headers: this.requestHeader});
  }

  getAll(): Observable<User[]> {
    return this.httpclient.get<User[]>(this.API+ "/listUser");
  }

  public forUser() {
    return this.httpclient.get(this.API + '/forUser', {
      responseType: 'text',
    });
  }

  public forAdmin() {
    return this.httpclient.get(this.API + '/forAdmin', {
      responseType: 'text',
    });
  }


  public roleMatch(allowedRoles : any) :boolean{
    let isMatch = false;
    const userRoles: any = this.auth.getRoles();
    if(userRoles) {
      for(let i = 0; i<userRoles.length; i++) {
        if(allowedRoles.indexOf(userRoles[i].roleName) !== -1){
         isMatch = true;
         break;
        }
      }
    }
    return isMatch;
    }
}


