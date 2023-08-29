import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }from '@angular/forms';
import { SouscategorieService } from 'src/app/services/souscategorie.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HttpEvent } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
 // styleUrls: ['./Update-categorie.component.css']
})
export class UpdateCategorieComponent implements OnInit {
  currentCategorie: Categorie = {};
  form: FormGroup;
//  num : any;
    idcategorie?:any;
    nomcategorie?:any;
    description?: any;
    image? : File;
    object: any;
    file: any;
    currentFile: any;
    base64Data: any;
    ImgUrl: any;
    base64Image: any;
//  code? : string;

  // constructor(){}



    constructor(public crudApi: CategorieService, private route: ActivatedRoute,
        public fb: FormBuilder, private domSanitizer: DomSanitizer,
        public toastr: ToastrService,
        private token: TokenStorageService,
      private router: Router,public dialogRef:MatDialogRef<UpdateCategorieComponent>) {
        this.form = this.fb.group({
          nomcategorie: [''],
          description : [''],
          image:['']
          // code: "",
          // id: null,
          // imagecategorie: "",
          // libelle: ""
        });
       }


       ngOnInit() {
        let role : any;
        role= localStorage.getItem('roles');
        if (!role){this.router.navigate(['/login'])}
        else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};
        this.idcategorie = this.route.snapshot.paramMap.get('idcategorie');
        this.crudApi.idcategorie = this.idcategorie;
        console.log(this.idcategorie);

        // this.selectedId = Number(params.get('id'));
        this.currentCategorie = this.token.getCategorie();
        this.crudApi.getData(this.idcategorie)
        .subscribe(
          data => {
            this.currentCategorie = data;
            this.nomcategorie = this.currentCategorie.nomcategorie;
            this.description = this.currentCategorie.description;
            this.currentFile = this.currentCategorie.image;
            this.ImgUrl = 'data:image/png;base64,' + this.currentCategorie.image;
            this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(this.ImgUrl);
          },
          error => {
            console.log(error);
          });
        this.form = new FormGroup({
        idcategorie: new FormControl ('', [Validators.required]),
        nomcategorie: new FormControl ('', [Validators.required]),
        description: new FormControl ('', [Validators.required]),

        image:new FormControl ('', [Validators.required])
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

editData(idcategorie: any) {
  this.file? this.file=this.file : this.file=this.currentFile;
  var formData = new FormData();
  formData.append('idcategorie', this.idcategorie)
  formData.append('nomcategorie', this.nomcategorie)
  formData.append('description', this.description)
  this.crudApi.updateData(
    this.idcategorie,
    this.file,
    this.nomcategorie,
    this.description
    ).
  subscribe((_data: any) => {
    this.router.navigate(['/categories']).then(() => {
      window.location.reload();
    });
  });
}
}
