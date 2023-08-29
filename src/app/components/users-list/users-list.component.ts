import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
  })
  export class UsersListComponent implements OnInit {

    p: number = 1;
    word: any;
    users? : any = [];
    currentUser: User = {};
    currentIndex = -1;

    email? : any;
    retrievedImage: any;
    base64Data: any;

    retrieveResonse: any;

    constructor(private httpClient: HttpClient,
      public userService : UserService, private token: TokenStorageService, private matDialog: MatDialog,
      public toastr: ToastrService, private router : Router){}


    ngOnInit(): void {
     this.retrieveUsers();
    }

    retrieveUsers(): void {
      this.userService.getAll()
        .subscribe(
          data => {
this.users=data
          },
          error => {
            console.log(error);
          });
          console.log(this.users);

    }

    getData() {
      this.userService.getAll().subscribe(
        response => { this.userService.list = response;
      }
      );
    }
}
