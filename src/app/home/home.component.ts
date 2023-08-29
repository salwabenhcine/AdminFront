import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import { MarqueService } from '../services/marque.service';
import { ProduitService } from '../services/produit.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  nbrUser: any;
  nbrCategory: any;
  nbrMarque: any;
  nbrProduit: any;

  constructor(private userService: UserService, public categorieService: CategorieService, public marqueService: MarqueService, public produitService: ProduitService, private router : Router) { }

  ngOnInit(): void {
    let role : any;
      role= localStorage.getItem('roles');
      if (!role){this.router.navigate(['/login'])}
      else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};
    this.categorieService.nbrCategory().subscribe(
      response => { this.nbrCategory = response; 
        console.log(response);
    }
    );
    this.userService.nbrUser().subscribe(
      response => { this.nbrUser = response; 
        console.log(response);
    }
    );
    this.marqueService.nbrMarque().subscribe(
      response => { this.nbrMarque = response; 
        console.log(response);
    }
    );
    this.produitService.nbrProduit().subscribe(
      response => { this.nbrProduit = response; 
        console.log(response);
    }
    );
  }
}