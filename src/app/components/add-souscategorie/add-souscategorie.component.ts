import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder , FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/models/categorie.model';
import { Souscategorie } from 'src/app/models/souscategorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { SouscategorieService } from 'src/app/services/souscategorie.service';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-add-souscategorie',
  templateUrl: './add-souscategorie.component.html',
  styleUrls: ['./add-souscategorie.component.css']
})
export class AddSouscategorieComponent implements OnInit {
  CategorieList: Categorie[] = [];
  form: FormGroup;
     nomsouscat?: any;

     description?: any;
     idcategorie?:any;
     imageUrl?: File;
     file? : any;


  constructor(public crudApi: SouscategorieService ,public fb: FormBuilder,public toastr: ToastrService,

    public categorieService: CategorieService,
    private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef:MatDialogRef<AddSouscategorieComponent>,

    ) {
      this.form = this.fb.group({
        idcategorie : [''],
        nomsouscat : [''],
        description : [''],
        imageUrl : [''],
      });
     }
  //  get f() { return this.crudApi.formData?.controls }
  ngOnInit() {
    let role : any;
    role= localStorage.getItem('roles');
    if (!role){this.router.navigate(['/login'])}
    else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};
    this.categorieService.getAll().subscribe(
      response => { this.CategorieList = response;
    }
    );


    this.form = new FormGroup({
      idcategorie: new FormControl ('', [Validators.required]),
      idsouscategorie: new FormControl ('', [Validators.required]),
      nomsouscat: new FormControl ('', [Validators.required]),
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


    var formData = new FormData();
    formData.append('nomsouscat', this.nomsouscat)
    formData.append('description', this.description)
    formData.append('idcategorie', this.idcategorie)

    this.crudApi.createData(
      //this.object,
      this.file,
      this.nomsouscat,
      this.description,
      this.idcategorie
      //this.crudApi.formData?.value
      ).
    subscribe((_data: any) => {
      // this.dialogRef.close();
      // this.crudApi.getAll().subscribe(
      //   response =>{this.crudApi.list = response;}
      //  );
      this.router.navigate(['/souscategories']).then(() =>{
        window.location.reload();
      })
    });
  }

  onChange(cat: any) {
    this.idcategorie=cat.value;
  }

  name(name: any) {
    this.nomsouscat=name.value;
  }

  desc(desc: any) {
    this.description=desc.value;
  }

 /*   if (this.crudApi.choixmenu == "A")
    {
      this.infoForm()
    }
    this.categorieService.getAll().subscribe(
      response =>{this.CategorieList = response;}
     );
   }

  infoForm() {
    this.crudApi.formData = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        ccateg: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
        rang: [1],
      });
    }



  ResetForm() {
      this.crudApi.formData?.reset();
  }
  onSubmit() {

    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    else
    {

     this.updateData()
    }

}



addData() {
  this.crudApi.createData(this.crudApi.formData?.value).
  subscribe( data => {
    this.dialogRef.close();

    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
    this.router.navigate(['/souscategories']);
  });
}
  updateData()
  {
    this.crudApi.updatedata(this.crudApi.formData?.value.code,this.crudApi.formData?.value).
    subscribe( data => {
      this.dialogRef.close();

      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
      this.router.navigate(['/scategories']);
    });
  }
/*
  OnSelectCateg(ctrl:any) {
    if (ctrl.selectedIndex == 0) {

     this.f['ccateg'].setValue('');

    //this.f(this.ccateg).setValue('');
   //   this.f['ccateg'].setValue('');
    }
    else {
      this.code = this.CategorieList[ctrl.selectedIndex - 1].code;
      this.crudApi.getNumero(this.code).subscribe(
        response => {+ this.num == response;
          if (this.num > 0)
          {
            this.code = (100000 + this.num +1).toString().substring(1);
          }
          else
          {
            this.code = (this.code+'01');
          }

          this.f['code'].setValue(this.code);
        }
      );

    }
  }*/

  }

