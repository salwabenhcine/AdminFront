import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/models/categorie.model';
import { Souscategorie } from 'src/app/models/souscategorie.model';
import { SouscategorieService } from 'src/app/services/souscategorie.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AddSouscategorieComponent } from '../add-souscategorie/add-souscategorie.component';
import { UpdateSouscategorieComponent } from '../update-souscategorie/update-souscategorie.component';

@Component({
  selector: 'app-souscategories-list',
  templateUrl: './souscategories-list.component.html',
  styleUrls: ['./souscategories-list.component.css'],
})
export class SouscategoriesListComponent implements OnInit {
  p: number = 1;
  souscategories?: any = [];
  // souscategories? : any = [] ;
  //souscategorie?: Souscategorie[]

  categorie?: Categorie;
  currentSouscategorie: Souscategorie = {};
  currentIndex = -1;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  categoryName?: string;
  word: any;

  control: FormControl = new FormControl('');
  /* constructor(public crudApi: SouscategorieService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddSouscategorieComponent>,) { }
 */
  constructor(
    private httpClient: HttpClient,
    public souscategorieService: SouscategorieService,
    private token: TokenStorageService,
    private matDialog: MatDialog,
    public toastr: ToastrService,
    private router : Router
  ) {}
  ngOnInit() {
    let role : any;
    role= localStorage.getItem('roles');
    if (!role){this.router.navigate(['/login'])}
    else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};
    //this.currentSouscategorie = this.token.getSouscategorie();
    this.retrieveSouscategories();
    //this.getData();
  }

  retrieveSouscategories(): void {
    this.souscategorieService.getAll().subscribe(
      (data) => {
        this.souscategories = data;
        this.souscategories.map((el: any) => {
          el.nomcategorie = el.categorie?.nomcategorie;
        });
        console.log( this.souscategories)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addSouscategorie() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '500px';
    dialogConfig.height = '100px';
    this.matDialog.open(
      AddSouscategorieComponent,
      //dialogConfig
      {
        width: '500px',
      }
    );
  }

  editData(idsouscategorie: any) {
    this.souscategorieService.idsouscategorie = idsouscategorie;
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = true;
    // dialogConfig.width = '500px';
    // dialogConfig.height = '100px';
    // this.matDialog.open(
    //   UpdateSouscategorieComponent,
    //   //dialogConfig
    //   {
    //     width: '500px',
    //   }
    // );
  }

  getData() {
    this.souscategorieService.getAll().subscribe((response) => {
      this.souscategorieService.list = response;
    });
  }

  removeData(idsouscategorie: any) {
    if (window.confirm('Voulez-vous supprimer cette sous-catégorie ?')) {
      this.souscategorieService.deleteData(idsouscategorie).subscribe(
        (data) => {
          this.toastr.warning('La sous-catégorie est supprimée');
          this.getData();
        },
        (error) => console.log(error)
      );
    }
  }
  async search() {
    if (this.word !== null && this.word !== undefined) {
      this.souscategories = {};

      await this.souscategorieService
        .findBynomsouscatContaining(this.word)
        .subscribe(
          (data) => {
            this.souscategories = data;
            this.souscategories.map((el: any) => {
              el.nomcategorie = el.categorie?.nomcategorie;
            });
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.retrieveSouscategories();
      this.getData();
    }
  }
}
/*
  addScategorie()
  {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddSouscategorieComponent, dialogConfig);
  }




  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
  }


  removeData(code: string) {
    if (window.confirm('Are sure you want to delete this Scatégorie ?')) {
    this.crudApi.deleteData(code)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' data successfully deleted!');
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Souscategorie) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";

    this.matDialog.open(AddSouscategorieComponent, dialogConfig);
  }       */
