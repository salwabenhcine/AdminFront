import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { User } from '../models/user.model';

const API_URL = 'http://localhost:8083/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API ="http://localhost:8083";

requestHeader = new HttpHeaders(
{ 'No-Auth':'True'}
);
list : any;
  constructor(private http: HttpClient, private auth:AuthentificationService) { }

  public login(email:string,password:string){
    return this.http.post(this.API + "/authenticate",{email,password}
    ,{headers: this.requestHeader});
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.API+"/listUser");
  }
  public forUser() {
    return this.http.get(this.API + '/forUser', {
      responseType: 'text',
    });
  }

  public forAdmin() {
    return this.http.get(this.API + '/forAdmin', {
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

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
