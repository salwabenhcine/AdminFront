import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Promotion } from 'src/app/models/promotion.model';
import { PromotionService } from 'src/app/services/promotion.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {
  currentPromotion: Promotion= {};
  form: FormGroup;

    codeBarre? : any;
    libelle? : any;
    avantage? : any;
    prixintial? : any;
    prixpromo?: any;
    canalDiffusion? : any;
    description? : any;
    dateDebutPromo? : any;
    dateFinPromo? : any;
    image? : File;
    file: any;

    constructor(public promotionService: PromotionService,  
      public fb: FormBuilder,
      public toastr: ToastrService,
      private token: TokenStorageService,
    private router: Router,public dialogRef:MatDialogRef<AddPromotionComponent>) {
      this.form = this.fb.group({       
        codeBarre : [''],
        libelle : [''],
        avantage : [''],
        prixintial : [''],
        prixpromo : [''],
        canalDiffusion : [''],
        description : [''],
        dateDebutPromo : [''],
        dateFinPromo : [''],
        image : [''],     
      });
     }
     ngOnInit() {
      let role : any;
      role= localStorage.getItem('roles');
      if (!role){this.router.navigate(['/login'])}
      else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};
    //  this.currentPromotion = this.token.getCategorie();
      this.form = new FormGroup({
      PromotionId: new FormControl ('', [Validators.required]),
      codeBarre: new FormControl ('', [Validators.required]),
      libelle: new FormControl ('', [Validators.required]),
      avantage: new FormControl ('', [Validators.required]),
      prixintial: new FormControl ('', [Validators.required]),
      prixpromo : new FormControl ('', [Validators.required]),
      canalDiffusion : new FormControl ('', [Validators.required]),
      description: new FormControl ('', [Validators.required]),
      dateDebutPromo: new FormControl ('', [Validators.required]),
      dateFinPromo: new FormControl ('', [Validators.required]),
      image:new FormControl ('', [Validators.required])
    });
    }

    img(file : any){
  console.log(file);
  console.log(file.files[0]);
  this.file = file.files[0];
   }

onSubmit() {
  
  var formData = new FormData();
  formData.append('codeBarre', this.form.get('codeBarre')?.value)
  formData.append('libelle', this.form.get('libelle')?.value)
  formData.append('avantage', this.form.get('avantage')?.value)
  formData.append('prixintial', this.form.get('prixintial')?.value)
  formData.append('prixpromo', this.form.get('prixpromo')?.value)
  formData.append('canalDiffusion', this.form.get('canalDiffusion')?.value)
  formData.append('description', this.form.get('description')?.value)
  formData.append('dateDebutPromo', this.form.get('dateDebutPromo')?.value)
  formData.append(' dateFinPromo', this.form.get(' dateFinPromo')?.value)
  this.promotionService.createData(
    this.file,
    this.codeBarre,
    this.libelle,
    this.avantage,
    this.prixintial,
    this.prixpromo,
    this.canalDiffusion,
    this.description,
    this.dateDebutPromo,
    this.dateFinPromo


    ).
  subscribe((_data: any) => {
    this.dialogRef.close();
    // this.crudApi.getAll().subscribe(
    //   response =>{this.crudApi.list = response;}
    //  );                                            
    this.router.navigate(['/promotions']);
  });
}
  }


