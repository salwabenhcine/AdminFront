import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder , FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { SouscategorieService } from 'src/app/services/souscategorie.service';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProduitService } from 'src/app/services/produit.service';
import { MarqueService } from 'src/app/services/marque.service';
import { Produit } from 'src/app/models/produit.model';
import { Souscategorie } from 'src/app/models/souscategorie.model';
import { Marque } from 'src/app/models/marque.model';
import { StringLiteralType } from 'typescript';


@Component({
  selector: 'app-update-produit',
  templateUrl: './Update-produit.component.html',
 // styleUrls: ['./Update-produit.component.css']
})
export class UpdateProduitComponent implements OnInit {
  CategorieList: Categorie[] = [];
  SouscategorieList: Souscategorie[] = [];
  MarqueList: Marque[] = [];
  form: FormGroup;
    ProductName?: any;
     souscategories: any;
     description?: any;
     idcategorie?:any;
     marques:any;
     imageURL?: File;
     file? : any;
     currentSubCategories : any;
     idsouscategorie? : any;
     idmarque? : any;
     code : any;
    name : any;
    codebarre : any;
    prix_de_vente : any;
    unite : any;
    qte : any;
    available : any;
    currentProduct: Produit = {};
    selected: any;
    ImgUrl: any;
    nommarque?:string
  constructor(public souscategorieService: SouscategorieService ,public fb: FormBuilder,public toastr: ToastrService,
    public categorieService: CategorieService, public produitService: ProduitService, public marqueService : MarqueService,
    private router : Router, private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef:MatDialogRef<UpdateProduitComponent>,
    ) {
      this.form = this.fb.group({
        idcategorie : [''],
        idsouscategorie : [''],
        idmarque : [''],
        name : [''],
        codebarre : [''],
        prix_de_vente : [''],
        description : [''],
        unite : [''],
        qte : [''],
        available : [''],
        imageURL : [''],

      });
     }
  ngOnInit() {
    let role : any;
    role= localStorage.getItem('roles');
    if (!role){this.router.navigate(['/login'])}
    else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};
    this.code = this.route.snapshot.paramMap.get('code');
    this.produitService.code = this.code;
    this.produitService.getData(this.code)
        .subscribe(
          data => {
            this.currentProduct = data;
            this.name=this.currentProduct.name;
            this.codebarre=this.currentProduct.codebarre;
            this.prix_de_vente=this.currentProduct.prix_de_vente;
            this.description=this.currentProduct.description;
            this.unite=this.currentProduct.unite;
            this.qte=this.currentProduct.qte;
            this.available=this.currentProduct.available;
            this.ImgUrl = 'data:image/png;base64,' + this.currentProduct.imageURL;
            this.form.controls['available'].patchValue(this.available);
            console.log(this.available);

            this.selected = this.currentProduct.categories;
            this.form.controls['idcategorie'].patchValue(this.selected.idcategorie);
            this.idcategorie = this.selected.idcategorie;

            this.selected = this.currentProduct.sosucategories;
            this.form.controls['idsouscategorie'].patchValue(this.selected.idsouscategorie);
            this.idsouscategorie = this.selected.idsouscategorie;

            this.selected = this.currentProduct.marque;
            this.form.controls['nommarque'].patchValue(this.selected.nommarque);
            this.nommarque = this.selected.nommarque;

          //  this.imageURL=this.currentProduct.imageURL;
            console.log(data);
          },
          error => {
            console.log(error);
          });

    this.categorieService.getAll().subscribe(
      response => { this.CategorieList = response; }
    );
    this.souscategorieService.getAll().subscribe(
      response => { this.SouscategorieList = response; }
    );

    this.marqueService.getAll()
      .subscribe(
        response => { this.MarqueList = response; }

       );

    this.form = new FormGroup({

      idcategorie: new FormControl (this.currentProduct.categories?.idcategorie, [Validators.required]),
      idsouscategorie: new FormControl (this.currentProduct.sosucategories?.idsouscategorie, [Validators.required]),
      idmarque: new FormControl (this.currentProduct.marque?.idmarque, [Validators.required]),
      code: new FormControl ('', [Validators.required]),
      name: new FormControl (this.currentProduct.name, [Validators.required]),
      description: new FormControl (this.currentProduct.description, [Validators.required]),
      prix_de_vente: new FormControl (this.currentProduct.prix_de_vente, [Validators.required]),
      unite: new FormControl (this.currentProduct.unite, [Validators.required]),
      codebarre: new FormControl (this.currentProduct.codebarre, [Validators.required]),
      qte: new FormControl (this.currentProduct.qte, [Validators.required]),
      available: new FormControl (this.currentProduct.available, [Validators.required]),
     // file:new FormControl (this.currentProduct.imageURL, [Validators.required])
    });

  }

  img(file : any){
   console.log(file);
    console.log(file.files[0]);
    this.file = file.files[0];
    this.form.get('image')?.updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.ImgUrl = reader.result as string;
    }
    reader.readAsDataURL(this.file)

  }
  onSubmit() {
    var formData = new FormData();
    formData.append('code', this.code)
    formData.append('name', this.name)
    formData.append('codebarre', this.codebarre)
    formData.append('prix_de_vente', this.prix_de_vente)
    formData.append('description', this.description)
    formData.append('unite', this.unite)
    formData.append('qte', this.qte)
    formData.append('available', this.available)
    formData.append('idcategorie', this.idcategorie)
    formData.append('idsouscategorie', this.idsouscategorie)
    formData.append('idmarque', this.idmarque)

    this.produitService.updateData(
      this.code,
      this.file,
      this.name,
      this.codebarre,
      this.prix_de_vente,
      this.description,
      this.unite,
      this.qte,
      this.available,
      this.idcategorie,
      this.idsouscategorie,
      this.idmarque
      ).
    subscribe((_data: any) => {
      this.router.navigate(['/produits']).then(() => {
        window.location.reload();
      });
    });
  }

  onChange(cat: any) {
    this.idcategorie=cat.value;
    console.log(this.idcategorie);

  //  this.currentSubCategories = this.souscategories.filter((el:any) => el.category.categoryId == this.categoryId);
  }

  onChangeSubCategory(subcat: any) {
    this.idsouscategorie=subcat.value;
  }

  onChangeMarque(marque: any) {
    this.idmarque=marque.value;
  }

  availableChange(av: any) {
    this.available=av.value;
    console.log(av.value);
  }

  nameChange(name: any) {
    this.name=name.value;
  }

  desc(desc: any) {
    this.description=desc.value;
  }

  prix(prix_de_vente: any) {
    this.prix_de_vente=prix_de_vente.value;
  }

  unit(unit: any) {
    this.unite=unit.value;
  }
  quantite(qte: any) {
    this.qte=qte.value;
  }
  cab(cab: any) {
    this.codebarre=cab.value;
  }
  }
