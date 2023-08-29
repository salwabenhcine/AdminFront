import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Marque } from 'src/app/models/marque.model';
import { MarqueService } from 'src/app/services/marque.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AddMarqueComponent } from '../add-marque/add-marque.component';
import { UpdateMarqueComponent } from '../update-marque/update-marque.component';


@Component({
  selector: 'app-marque-list',
  templateUrl: './marque-list.component.html',
  styleUrls: ['./marque-list.component.css']
})
export class MarqueListComponent implements OnInit {
  p: number = 1;
 // marques?: Marque[] ;
 marques?: any = [] ;
  currentMarque: Marque = {};
  currentIndex = -1;

  word : any;
  retrievedImage: any;

    base64Data: any;

    retrieveResonse: any;

  constructor(private httpClient: HttpClient,
    public marqueService : MarqueService, private token: TokenStorageService, private matDialog: MatDialog,
    public toastr: ToastrService, private router: Router){}
  ngOnInit() {
    let role : any;
    role= localStorage.getItem('roles');
    if (!role){this.router.navigate(['/login'])}
    else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};
  //  this.currentMarque = this.token.getMarque();
    this.retrieveMarques();
  }

  retrieveMarques(): void {
    this.marqueService.getAll()
      .subscribe(
        data => {
          this.marques = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  addMarque()
  {
    console.log("log");

      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="500px";
      dialogConfig.height="100px";
      this.matDialog.open(AddMarqueComponent,
        //dialogConfig
        {
          width: '250px',
        });
    }

    getData() {
      this.marqueService.getAll().subscribe(
        response => { this.marqueService.list = response;
      }
      );
    }

    removeData(marqueId: any) {
      if (window.confirm('Voulez-vous supprimer cette marque ?')) {
        this.marqueService.deleteData(marqueId)
          .subscribe(
            data => {
              console.log(data);
              this.toastr.warning('La marque est supprimée');
              this.getData();
            },
            error => console.log(error));
      }
    }

    editData(idmarque: any) {
      // console.log(marqueId);
      this.marqueService.idmarque = idmarque;
      // const dialogConfig = new MatDialogConfig();
      // dialogConfig.autoFocus = true;
      // dialogConfig.disableClose = true;
      // dialogConfig.width="500px";
      // dialogConfig.height="100px";
      // this.matDialog.open(UpdateMarqueComponent,
      //   {
      //     width: '500px',
      //   });
    }

    async search(){
      if (this.word !== null && this.word !== undefined) {
          this.marques = [];

          await this.marqueService.findBynommarqueContaining(this.word)
            .subscribe(
              data => {
                this.marques = data;
                console.log(data);
              },
              error => {
                console.log(error);
              });
      } else {
        this.retrieveMarques();
        this.getData();
      }
    }

  }
