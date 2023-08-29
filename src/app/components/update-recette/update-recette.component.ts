import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produit } from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/services/produit.service';
import { RecetteService } from 'src/app/services/recette.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'update-recette',
  templateUrl: './update-recette.component.html',
  styleUrls: ['./update-recette.component.css']
})
export class UpdateRecetteComponent implements OnInit {
  ProductList: Produit[] = [];
  form: FormGroup;
  description?: any;
  products:any;
  imageUrl: any;
  file? : any;
  marqueId : any;
  id : any;
  name : any;
  nomRecette : any;
  currentRecette: any;

  constructor(public fb: FormBuilder, public produitService: ProduitService, public recetteService : RecetteService,
    private router : Router, public toastr: ToastrService, private route: ActivatedRoute
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.recetteService.getData(this.id)
    .subscribe(
      data => {
        this.currentRecette = data;
        this.nomRecette=this.currentRecette.nomRecette;
        this.description=this.currentRecette.description;
        // this.imageUrl = 'data:image/png;base64,' + this.currentRecette.imageRecette;
        // this.selected = this.currentProduct.category;
        // this.form.controls['categoryId'].patchValue(this.selected.categoryId);
        // this.categoryId = this.selected.categoryId;
        console.log(data);
      },
      error => {
        console.log(error);
      });
    this.produitService.getAll().subscribe(
      response => { this.ProductList = response;
        console.log(this.ProductList);
       }
    );
    this.produitService.code = this.id;
    this.form = new FormGroup({
      productId: new FormControl ('', [Validators.required]),
      nomRecette: new FormControl (this.nomRecette, [Validators.required]),
      description: new FormControl (this.description, [Validators.required]),
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

    this.recetteService.updateData(
      this.id,
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
