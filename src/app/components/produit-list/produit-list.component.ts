import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/models/categorie.model';
import { Marque } from 'src/app/models/marque.model';
import { Produit } from 'src/app/models/produit.model';
import { Souscategorie } from 'src/app/models/souscategorie.model';
import { ProduitService } from 'src/app/services/produit.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AddProduitComponent } from '../add-produit/add-produit.component';
import { UpdateProduitComponent } from '../update-produit/update-produit.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.css']
})
export class ProduitListComponent implements OnInit {
  p: number = 1;
 // produits?: Produit[] ;
  produits? : any = [];
  currentProduit: Produit = {};
  currentIndex = -1;
  word: any;
  nomcategorie?: string;
  nomsouscat?: string;
  nommarque?: string;
  retrievedImage: any;
  categorie? : Categorie;
  marque? : Marque;
  souscategorie? : Souscategorie;

    base64Data: any;

    retrieveResonse: any;

  constructor(private httpClient: HttpClient,
    public produitService : ProduitService, private token: TokenStorageService, private matDialog: MatDialog,
    private router : Router, public toastr: ToastrService){}
  ngOnInit() {
    let role : any;
    role= localStorage.getItem('roles');
    if (!role){this.router.navigate(['/login'])}
    else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};
  //  this.currentProduit = this.token.getCategorie();
   // this.retrieveCategories();
   this.retrieveProduits();
    this.getData();
  }

  retrieveProduits(): void {
    this.produitService.getAll()
      .subscribe(
        data => {
          this.produits = data;
          this.produits.map((el:any) =>
            {
              el.nomcategorie=el.categorie?.nomcategorie;
              el.nomsouscat=el.souscategorie?.nomsouscat;
              el.nommarque=el.marque?.nommarque;
              el.available==false? el.available="bloqué": el.qte==0? el.available="hors stock": el.available="disponible";
            })
          console.log(data);
          console.log(this.produits)
        },
        error => {
          console.log(error);
        });
  }

  getData() {
    this.produitService.getAll().subscribe(
      response => { this.produitService.list = response;
    }
    );
  }
  addProduit()
  {
    console.log("log");

      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="500px";
      dialogConfig.height="100px";
      this.matDialog.open(AddProduitComponent,
        //dialogConfig
        {
          width: '250px',
        });
  }
  editData(code: any) {
    this.produitService.code = code;
    this.router.navigate(['edit-produit/'+code]).then(() => {
      window.location.reload();
    });
  }

  removeData(code: any) {
    if (window.confirm('Voulez-vous supprimer ce produit ?')) {
      this.produitService.deleteData(code)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning('Le produit est supprimé');
            this.getData();
          },
          error => console.log(error));
    }
  }

  async search(){
    if (this.word !== null && this.word !== undefined) {
        this.produits = [];

        await this.produitService.findBynameContaining(this.word)
          .subscribe(
            data => {
              this.produits = data;
              this.produits.map((el:any) =>
            {
              el.nomcategorie=el.categorie?.nomcategorie;
              el.nomsouscat=el.souscategorie?.nomsouscat;
              el.nommarque=el.marque?.nommarque;

            })
            },
            error => {
              console.log(error);
            });
    } else {
      this.retrieveProduits();
      this.getData();
    }
  }
}
