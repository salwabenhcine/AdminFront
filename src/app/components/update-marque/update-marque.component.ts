import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Marque } from 'src/app/models/marque.model';
import { MarqueService } from 'src/app/services/marque.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-update-marque',
  templateUrl: './Update-marque.component.html',
 // styleUrls: ['./Update-marque.component.css']
})
export class UpdateMarqueComponent implements OnInit {
  currentMarque: Marque = {};
  form: FormGroup;

    idmarque?:any;
    nommarque?:any;
    teleMarque?: any;
    logo? : File;
    emailMarque?: any;
    contrat? : File;
    object: any;
    file: any;
    file1 : any;
    currentFile: any;
    currentFile1: any;
    base64Data: any;
    ImgUrl: any;


  constructor(public marqueService: MarqueService,
    public fb: FormBuilder, private route: ActivatedRoute,
    public toastr: ToastrService,
    private token: TokenStorageService,
  private router: Router,public dialogRef:MatDialogRef<UpdateMarqueComponent>){
    this.form = this.fb.group({
      nommarque: [''],
      teleMarque : [''],
      emailMarque : [''],
      logo:[''],
      contrat:['']

    });
  }
  ngOnInit() {
    let role : any;
    role= localStorage.getItem('roles');
    if (!role){this.router.navigate(['/login'])}
    else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};
    this.idmarque = this.route.snapshot.paramMap.get('idmarque');
    this.marqueService.idmarque = this.idmarque;
    this.marqueService.getData(this.idmarque)
    .subscribe(
      data => {
        this.currentMarque = data;
        this.currentFile1 = this.currentMarque.contrat;
        this.nommarque = this.currentMarque.nommarque;
        this.teleMarque = this.currentMarque.teleMarque;
        this.emailMarque = this.currentMarque.emailMarque;
        this.ImgUrl = 'data:image/png;base64,' + this.currentMarque.logo;

      },
      error => {
        console.log(error);
      });
    this.form = new FormGroup({

      marqueId: new FormControl ('', [Validators.required]),
      logo: new FormControl ('', [Validators.required]),
      nomMarque: new FormControl ('', [Validators.required]),
      teleMarque: new FormControl ('', [Validators.required]),
      emailMarque : new FormControl ('', [Validators.required]),

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
  img1(file1 : any){
    console.log(file1);
    console.log(file1.files[0]);
    this.file1 = file1.files[0];
  }


  editData(marqueId: any) {
    this.file1? this.file1=this.file1 : this.file1=this.currentFile1;
    var formData = new FormData();
    formData.append('idmarque', this.idmarque)
    formData.append('nommarque', this.nommarque)
    formData.append('teleMarque', this.teleMarque)
    formData.append('emailMarque', this.emailMarque)
    this.marqueService.updateData(
      this.idmarque,
      this.file1,
      this.nommarque,
      this.teleMarque,
      this.emailMarque
      ).
    subscribe((_data: any) => {
      this.router.navigate(['/marques']).then(() => {
        window.location.reload();
      });
    });
  }
}
