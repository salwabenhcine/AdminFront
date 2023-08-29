import { ActivatedRoute, Router } from '@angular/router';
import { Souscategorie } from 'src/app/models/souscategorie.model';
import { SouscategorieService } from 'src/app/services/souscategorie.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder , FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-update-souscategorie',
  templateUrl: './Update-souscategorie.component.html',
  styleUrls: ['./Update-souscategorie.component.css']
})
export class UpdateSouscategorieComponent implements OnInit {
  selected: any;
  CategorieList: Categorie[] = [];
  form: FormGroup;
     nomsouscat?: any;
     currentSouscategorie: Souscategorie = {};
     description?: any;
     idcategorie?:any;
     imageUrl?: File;
     file? : any;
     idsouscategorie: any;
     ImgUrl: any;

  constructor(public crudApi: SouscategorieService ,public fb: FormBuilder,public toastr: ToastrService,
    private route: ActivatedRoute,
    public categorieService: CategorieService,
    private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef:MatDialogRef<UpdateSouscategorieComponent>,

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
    this.idsouscategorie = this.route.snapshot.paramMap.get('idsouscategorie');
    this.crudApi.idcategorie = this.idcategorie;
    this.crudApi.idsouscategorie = this.idsouscategorie;
    this.crudApi.getData(this.idsouscategorie)
        .subscribe(
          data => {
            this.currentSouscategorie = data;
            this.description = this.currentSouscategorie.description;
            this.nomsouscat = this.currentSouscategorie.nomsouscat;
            this.selected = this.currentSouscategorie.categorie;
            // this.form.value.categoryId.patchValue(this.selected.categoryId);
            this.form.controls['idcategorie'].patchValue(this.selected.idcategorie);
            this.idcategorie = this.selected.idcategorie;
            this.ImgUrl = 'data:image/png;base64,' + this.currentSouscategorie.imageUrl;
          },
          error => {
            console.log(error);
          });
    this.categorieService.getAll().subscribe(
      response => { this.CategorieList = response;
    }
    );


    this.form = new FormGroup({
      idcategorie: new FormControl (this.currentSouscategorie.categorie?.idcategorie, [Validators.required]),
      idsouscategorie: new FormControl ('', [Validators.required]),
      nomsouscat: new FormControl (this.currentSouscategorie.nomsouscat, [Validators.required]),
      description: new FormControl (this.currentSouscategorie.description, [Validators.required]),

      imageUrl:new FormControl ('', [Validators.required])
    });
  }

  img(file : any){
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
    formData.append('idsouscategorie', this.idsouscategorie)
    formData.append('nomsouscat', this.nomsouscat)
    formData.append('description', this.description)
    formData.append('idcategorie', this.idcategorie)

    this.crudApi.updateData(
      this.idsouscategorie,
      this.file,
      this.nomsouscat,
      this.description,
      this.idcategorie
      //this.crudApi.formData?.value
      ).
    subscribe((_data: any) => {
      this.router.navigate(['/souscategories']).then(() => {
        window.location.reload();
      });
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

