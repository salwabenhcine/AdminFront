import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Marque } from 'src/app/models/marque.model';
import { MarqueService } from 'src/app/services/marque.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-marque',
  templateUrl: './add-marque.component.html',
  styleUrls: ['./add-marque.component.css']
})
export class AddMarqueComponent implements OnInit {
  currentMarque: Marque = {};
  form: FormGroup;
    nommarque? : any;
    teleMarque? : any;
    emailMarque? : any;
    Logo? : File;
    contrat? : File;
    file: any;
    file1: any;

    constructor(public marqueService: MarqueService,
      public fb: FormBuilder,
      public toastr: ToastrService,
      private token: TokenStorageService,
    private router: Router,public dialogRef:MatDialogRef<AddMarqueComponent>) {
      this.form = this.fb.group({
        nommarque: [''],
        teleMarque: [''],
        emailMarque: [''],
        Logo: [''],
      });
     }

     ngOnInit() {
      let role : any;
      role= localStorage.getItem('roles');
      if (!role){this.router.navigate(['/login'])}
      else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};
    //  this.currentCategorie = this.token.getCategorie();
      this.form = new FormGroup({
        idmarque: new FormControl ('', [Validators.required]),
        nommarque: new FormControl ('', [Validators.required]),
        teleMarque: new FormControl ('', [Validators.required]),
        emailMarque: new FormControl ('', [Validators.required]),
        logo:new FormControl ('', [Validators.required]),
    });
    }
    img(file1 : any){
      console.log(file1);
      console.log(file1.files[0]);
      this.file1 = file1.files[0];
    }
    onSubmit() {

      var formData = new FormData();
      console.log(this.nommarque);

    formData.append('nommarque',
    this.nommarque
    // this.form.get('nomMarque')?.value
    );
    formData.append('teleMarque', this.form.get('teleMarque')?.value)
    formData.append('emailMarque', this.form.get('emailMarque')?.value)
      this.marqueService.createData(
        this.file1,
        this.nommarque,
        this.teleMarque,
        this.emailMarque
        ).
      subscribe((_data: any) => {
        this.router.navigate(['/marques']).then(() =>{
          window.location.reload();
        })
      });
    }

  }





















