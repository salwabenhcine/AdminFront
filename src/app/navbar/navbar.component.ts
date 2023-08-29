import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

visible : any;
  constructor() {

  }

  ngOnInit(){

  }

  logo(){
this.visible = true ;
console.log('khw mchet');
  }

}
