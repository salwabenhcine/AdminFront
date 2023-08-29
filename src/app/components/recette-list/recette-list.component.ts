import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recette } from 'src/app/models/recette.model';
import { RecetteService } from 'src/app/services/recette.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthentificationService } from '../services/authentification.service';
import { HttpServiceService } from 'src/app/http-service.service';

@Component({
  selector: 'app-recette-list',
  templateUrl: './recette-list.component.html',
  styleUrls: ['./recette-list.component.css']
})
export class RecetteListComponent implements OnInit {
  p: number = 1;
  recettes?: any = [];

  // categorie?: Categorie;
  currentRecette: Recette = {};
  currentIndex = -1;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  categoryName?: string;
  word: any;

  control: FormControl = new FormControl('');
  constructor(
    private httpClient: HttpClient,
    public recetteService: RecetteService,
    private token: TokenStorageService,
    public toastr: ToastrService,
    private router : Router,
    private http: HttpServiceService,
    private auth: AuthentificationService
  ) {}
  ngOnInit() {
    let role : any;
    role= localStorage.getItem('roles');
    if (!role){this.router.navigate(['/login'])}
    else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};
    //this.currentSouscategorie = this.token.getSouscategorie();
    this.retrieveRecettes();
    //this.getData();
  }


  retrieveRecettes(){
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer '+this.auth.getToken()
      })
    };
    this.http.postRequestWithToken("api/recette/",{}).subscribe((data:any)=>{
      this.recettes=data;
      return(data);
     })
     return (this.recettes);
  }

  getData() {
    this.recetteService.getAll().subscribe((response) => {
      this.recetteService.list = response;
    });
  }

  editData(id: any) {
    // this.produitService.id = id;
    this.router.navigate(['edit-recette/'+id]).then(() => {
      window.location.reload();
    });
  }

  removeData(id: any) {
    if (window.confirm('Voulez-vous supprimer cette recette ?')) {
      this.recetteService.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning('La recette a été supprimée');
            this.getData();
          },
          error => console.log(error));
    }
  }

  async search(){
    if (this.word !== null && this.word !== undefined) {
        this.recettes = [];
        await this.recetteService.findBynameContaining(this.word)
          .subscribe(
            data => {
              this.recettes = data;
              console.log(data);
            },
            error => {
              console.log(error);
            });
    } else {
      this.retrieveRecettes();
      // this.getData();
    }
  }
  }
