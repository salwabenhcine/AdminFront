import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form: any = {
    email: null,
    password: null
  };
  //loginForm: any
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private userService:UserService,
    private auth: AuthentificationService,
    private router: Router){}
  ngOnInit(): void {
    this.logout();
  }
    login(email:string,password:string) {

      this.userService.login(email,password).subscribe(
        (response: any) => {          
          this.auth.setRoles(response.user.role);
          this.auth.setToken(response.jwtToken);
          const role = response.user.role[0].roleName;
          if (role === 'ADMIN') {
            this.router.navigate(['/home'])
            .then(() =>{
              window.location.reload();
              // console.log('1');
            })
            ;
          } else {
            this.router.navigate(['/login']);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
    logout(): void {
      this.auth.clear();
    }
  }
  