import { Component, OnInit, Inject  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }from '@angular/forms';
import { SouscategorieService } from 'src/app/services/souscategorie.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})

export class AddCategorieComponent implements OnInit {
  currentCategorie: Categorie = {};
  form: FormGroup;
//  num : any;
    nomcategorie?:any;
    description?: any;
    image? : File;
    object: any;
    file: any;

//  code? : string;

  // constructor(){}



    constructor(public crudApi: CategorieService,
        public fb: FormBuilder,
        public toastr: ToastrService,
        private token: TokenStorageService,
      private router: Router,public dialogRef:MatDialogRef<AddCategorieComponent>) {
        this.form = this.fb.group({
          categoryName: [''],
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
        this.currentCategorie = this.token.getCategorie();
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
}

onSubmit() {
  // this.object = {
  //   image: this.file,
  //   description: this.description,
  //   categoryName: this.categoryName,

  // }
  var formData = new FormData();
  formData.append('nomcategorie', this.nomcategorie)
  formData.append('description', this.description)
  this.crudApi.createData(
    //this.object,
    this.file,
    this.nomcategorie,
    this.description
    ).
    subscribe((_data: any) => {
      this.router.navigate(['/categories']).then(() =>{
        window.location.reload();
      })
    });
}
/*

onSubmit(){
  this.crudApi
  .createData(this.form.value.file,this.form.value.categoryName, this.form.value.description)
  .subscribe((event: HttpEvent<any>) =>
  this.dialogRef.close()

  );
  this.router.navigate(['/categories']);
}
*/
}
