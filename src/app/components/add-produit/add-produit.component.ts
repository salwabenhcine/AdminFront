import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder , FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { SouscategorieService } from 'src/app/services/souscategorie.service';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProduitService } from 'src/app/services/produit.service';
import { MarqueService } from 'src/app/services/marque.service';

@Component({
  selector: 'app-add-marque',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {
  CategorieList: Categorie[] = [];
  form: FormGroup;
    ProductName?: any;
     souscategories: any;
     description?: any;
     idcategorie?:any;
     marques:any;
     imageUrl?: File;
     file? : any;
     currentSubCategories : any;
     idsouscategorie : any;
     idmarque : any;
     nommarque:any
     id : any;
    name : any;
    codebarre : any;
    prix_de_vente : any;
    unite : any;
    qte : any;
    available : any;

  constructor(public souscategorieService: SouscategorieService ,public fb: FormBuilder,public toastr: ToastrService,
    public categorieService: CategorieService, public produitService: ProduitService, public marqueService : MarqueService,
    private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef:MatDialogRef<AddProduitComponent>,
    ) {
      this.form = this.fb.group({
        idcategorie : [''],
        idsouscategorie : [''],
        description : [''],
        imageUrl : [''],
        // id : [''],
        name : [''],
        codebarre : [''],
        prix_de_vente : [''],
        unite : [''],
        qte : [''],
        available : [''],
        nommarque : [''],
      });
     }
  ngOnInit() {
    let role : any;
    role= localStorage.getItem('roles');
    if (!role){this.router.navigate(['/login'])}
    else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};
    this.categorieService.getAll().subscribe(
      response => { this.CategorieList = response;
        console.log(this.CategorieList);
       }
    );

    this.marqueService.getAll()
      .subscribe(
        data => {
          this.marques = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });

    this.form = new FormGroup({
      idcategorie: new FormControl ('', [Validators.required]),
      idsouscategorie: new FormControl ('', [Validators.required]),
      nommarque: new FormControl ('', [Validators.required]),
      name: new FormControl ('', [Validators.required]),
      description: new FormControl ('', [Validators.required]),
      prix_de_vente: new FormControl ('', [Validators.required]),
      unite: new FormControl ('', [Validators.required]),
      codebarre: new FormControl ('', [Validators.required]),
      qte: new FormControl ('', [Validators.required]),
      available: new FormControl ('', [Validators.required]),
      imageUrl:new FormControl ('', [Validators.required])
    });

    this.souscategorieService.getAll()
      .subscribe(
        data => {
          this.souscategories = data;
        },
        error => {
          console.log(error);
        });
  }

  img(file : any){
    console.log(file);
    console.log(file.files[0]);
    this.file = file.files[0];
  }
  onSubmit() {
    console.log(this.idcategorie);


    var formData = new FormData();
    formData.append('idsouscategorie', this.idsouscategorie)
    formData.append('description', this.description)
    formData.append('idcategorie', this.idcategorie)
    formData.append('name', this.name)
    formData.append('codebarre', this.codebarre)
    formData.append('prix_de_vente', this.prix_de_vente)
    formData.append('unite', this.unite)
    formData.append('qte', this.qte)
    formData.append('available', this.available)
    formData.append('nommarque', this.nommarque)

    this.produitService.createData(
      this.file,
      this.description,
      this.idcategorie,
      this.name,
      this.codebarre,
      this.prix_de_vente,
      this.unite,
      this.qte,
      this.available,
      this.idsouscategorie,
      this.nommarque
      ).
    subscribe((_data: any) => {

      this.router.navigate(['/produits']).then(() =>{
        window.location.reload();
      })
    //  this.dialogRef.close();
     // this.router.navigate(['/produits']);
    });
  }

  onChange(cat: any) {
    this.idcategorie=cat.value;
    console.log(this.idcategorie);

    this.currentSubCategories = this.souscategories.filter((el:any) => el.categories.idcategorie == this.idcategorie);
  }

  onChangeSubCategory(subcat: any) {
    this.idsouscategorie=subcat.value;
  }

  onChangeMarque(marques: any) {
    this.nommarque=marques.value;
  }

  availableChange(av: any) {
    this.available=av.value;
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
  }


