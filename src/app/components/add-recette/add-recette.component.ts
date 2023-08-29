import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produit } from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/services/produit.service';
import { RecetteService } from 'src/app/services/recette.service';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthentificationService } from '../services/authentification.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-marque',
  templateUrl: './add-recette.component.html',
  styleUrls: ['./add-recette.component.css']
})
export class AddRecetteComponent implements OnInit {
  ProductList: Produit[] = [];
  form: FormGroup;
  ProductName?: any;
  souscategories: any;
  description?: any;
  products:any;
  imageUrl?: File;
  file? : any;
  marqueId : any;
  id : any;
  name : any;
  nomRecette : any;

  constructor(public fb: FormBuilder, public produitService: ProduitService, public recetteService : RecetteService,
    private router : Router, public toastr: ToastrService,private auth:AuthentificationService
    ) {
      this.form = this.fb.group({
        description : [''],
        imageUrl : [''],
        nomRecette : [''],
        productId : [''],
      });
     }

  ngOnInit() {
    let role : any;
    role= localStorage.getItem('roles');
    if (!role){this.router.navigate(['/login'])}
    else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};
    this.produitService.getAll().subscribe(
      response => { this.ProductList = response;
        console.log(this.ProductList);
       }
    );

    this.form = new FormGroup({
      productId: new FormControl ('', [Validators.required]),
      nomRecette: new FormControl ('', [Validators.required]),
      description: new FormControl ('', [Validators.required]),
      imageUrl:new FormControl ('', [Validators.required])
    });
  }

  img(file : any){
    console.log(file);
    console.log(file.files[0]);
    this.file = file.files[0];
  }
  onSubmit() {
    console.log(this.nomRecette);
    console.log(this.description);

    var formData = new FormData();
    formData.append('file', this.file);
    formData.append('description', this.description)
    formData.append('nomRecette', this.nomRecette)
    formData.append('products', this.products)
    this.recetteService.createData(
      this.file,
      this.description,
      this.nomRecette,
      this.products
      ).
    subscribe((_data: any) => {

      this.router.navigate(['/recettes']).then(() =>{
        window.location.reload();
      })
    });
  }

  nameChange(name: any) {
    this.nomRecette=name.value;
  }

  desc(desc: any) {
    this.description=desc.value;
  }
}
