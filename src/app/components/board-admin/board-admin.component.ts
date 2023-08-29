import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      (data:any) => {
        this.content = data;
      },
      (err:any) => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}