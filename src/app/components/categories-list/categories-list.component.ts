import { Component, OnInit,Inject } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCategorieComponent } from '../add-categorie/add-categorie.component';
import { UpdateCategorieComponent } from '../update-categorie/update-categorie.component';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  
  p: number = 1;
 // categories?: Categorie[] ;
  word: any;
 categories? : any = [];
  currentCategorie: Categorie = {};
  currentIndex = -1;
 
 idcategorie? : any;
  retrievedImage: any;
    base64Data: any;
  
    retrieveResonse: any;

  constructor(private httpClient: HttpClient, private router: Router,
    public categorieService : CategorieService, private token: TokenStorageService, private matDialog: MatDialog,
    public toastr: ToastrService,  
    ){}
  ngOnInit() {
    let role : any;
    role= localStorage.getItem('roles');
    if (!role){this.router.navigate(['/login'])}
    else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};
   // this.currentCategorie = this.token.getCategorie();
    this.retrieveCategories();
    this.getData();
  }


  retrieveCategories(): void {
    this.categorieService.getAll()
      .subscribe(
        data => {
          this.categories = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  addCategorie()
  {
    console.log("log");
    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="500px";
      dialogConfig.height="100px";
      this.matDialog.open(AddCategorieComponent, 
        //dialogConfig
        {
          width: '250px',
        });
    }

    getData() {
      this.categorieService.getAll().subscribe(
        response => { this.categorieService.list = response; 
      }
      );
    }

    removeData(idcategorie: any) {
      if (window.confirm('Voulez-vous supprimer cette catégorie ?')) {
        this.categorieService.deleteData(idcategorie)
          .subscribe(
            data => {
              console.log(data);
              this.toastr.warning('La catégorie est supprimée');
              this.getData();
            },
            error => console.log(error));
      }
    }
    editData(idcategorie: any) {
      // console.log(categoryId);
      this.categorieService.idcategorie = idcategorie;
      // const dialogConfig = new MatDialogConfig();
      // dialogConfig.autoFocus = true;
      // dialogConfig.disableClose = true;
      // dialogConfig.width="500px";
      // dialogConfig.height="100px";
      // this.matDialog.open(UpdateCategorieComponent, 
      //   {
      //     width: '250px',
      //   });
      // this.router.navigate(['/edit-categorie']);
    }

    async search(){
      if (this.word !== null && this.word !== undefined) {
          this.categories = [];
      
          await this.categorieService.findBynomcategorieContaining(this.word)
            .subscribe(
              data => {
                this.categories = data;
                console.log(data);
              },
              error => {
                console.log(error);
              });
      } else {
        this.retrieveCategories();
        this.getData();
      }
    }
   /*constructor(public crudApi: CategorieService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef:MatDialogRef<AddCategorieComponent>,) { }

  ngOnInit() {
    
    this.getData();
  }

  getData() {
    this.crudApi.getAll().subscribe(
      response => { this.crudApi.list = response; 
    }
    );
  }

  removeData(code: string) {
    if (window.confirm('Are sure you want to delete this Catégorie ?')) {
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
  
  selectData(item : Categorie) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width='600px';
    dialogConfig.height='400px';
    
    this.matDialog.open(AddCategorieComponent, dialogConfig);
  }
  
 addCategorie()
  {
    this.crudApi.choixmenu = "A";
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
    //  dialogConfig.disableClose = true;
      dialogConfig.width='600px';
      dialogConfig.height='400px';
      this.matDialog.open(AddCategorieComponent, dialogConfig);
    }
  }




















 categories: Categorie[] = [];
  currentCategorie:  Categorie = {};
  currentIndex = -1;
  nomcategorie = '';
  idcategorie= '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  //toastr: any;

  constructor(private categorieService: CategorieService , private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
  
    this.retrieveCategories();
    
  }

  getRequestParams(searchNomcategorie: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchNomcategorie) {
      params[`nomcategorie`] = searchNomcategorie;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveCategories(): void {
    const params = this.getRequestParams(this.nomcategorie, this.page, this.pageSize);

    this.categorieService.getAll(params)
    .subscribe(
      response => {
        const { categories, totalItems } = response;
        this.categories = categories;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveCategories();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveCategories();
  }

  refreshList(): void {
    this.retrieveCategories();
    this.currentCategorie = {};
    this.currentIndex = -1;
  }

  setActiveCategorie(categorie: Categorie, index: number): void {
    this.currentCategorie = categorie;
    this.currentIndex = index;
  }

  removeAllCategories(): void {
    this.categorieService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchNomcategorie(): void {
    this.page = 1;
    this.retrieveCategories();
  }
  }*/
  
}
