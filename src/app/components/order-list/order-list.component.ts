import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthentificationService } from 'src/app/authentification.service';
import { HttpServiceService } from 'src/app/http-service.service';
import { Promotion } from 'src/app/models/promotion.model';
import { CartService } from 'src/app/services/cart.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AddPromotionComponent } from '../add-promotion/add-promotion.component';
import { DetailOrderComponent } from '../detail-order/detail-order.component';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  p: number = 1;
  orders?: any = [];

  // categorie?: Categorie;
  currentIndex = -1;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  categoryName?: string;
  word: any;
  // statut: any;

  control: FormControl = new FormControl('');
  constructor(
    private httpClient: HttpClient,
    public cartService: CartService,
    private token: TokenStorageService,
    public toastr: ToastrService,
    private router :Router,
    private http: HttpServiceService,
    private auth: AuthentificationService
  ) {}
  ngOnInit() {
    let role : any;
    role= localStorage.getItem('roles');
    if (!role){this.router.navigate(['/login'])}
    else if (role.slice(14,19)!='ADMIN'){this.router.navigate(['/login'])};

    this.retrieveOrders();
  }

  retrieveOrders(){
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer '+this.auth.getToken()
      })
    };
    this.http.postRequestWithToken("api/order/",{}).subscribe((data:any)=>{
      this.orders=data;
      return(data);
     })
     return (this.orders);
  }

  getByOrderId(orderId:string): Observable<any[]> {
    return this.httpClient.get<any[]>(`api/order/productCheckoutCart/${orderId}`);
  }

  // confirmation(id: any){
  //   const formData: FormData = new FormData() ;
  //   formData.append('statut', this.statut);


  //   const req = new HttpRequest('PUT', `http://localhost:8080/api/order/update/${id}`, formData,
  //   {
  //     reportProgress: true,
  //     responseType: 'json',
  //   } );

  //   return this.httpClient.request(req).subscribe(()=>window.location.reload());
  // }

  change(stat: any, id: any) {
    const formData: FormData = new FormData() ;
    formData.append('statut', stat.value);
  

    const req = new HttpRequest('PUT', `http://localhost:8083/api/order/update/${id}`, formData,
    {
      reportProgress: true,
      responseType: 'json',
    } );

    return this.httpClient.request(req).subscribe(()=>window.location.reload());
  }
  // editData(subCategoryId: any) {
  //   this.souscategorieService.subcategoryId = subCategoryId;
  // }

  //getData() {
  //  this.cartService.getAll().subscribe((response) => {
  //    this.cartService.list = response;
  //  });
  //}

  // removeData(subCategoryId: any) {
  //   if (window.confirm('Voulez-vous supprimer cette sous-catégorie ?')) {
  //     this.souscategorieService.deleteData(subCategoryId).subscribe(
  //       (data) => {
  //         this.toastr.warning('La sous-catégorie est supprimée');
  //         this.getData();
  //       },
  //       (error) => console.log(error)
  //     );
  //   }
  // }
  async search() {
  //   if (this.word !== null && this.word !== undefined) {
  //     this.souscategories = {};

  //     await this.souscategorieService
  //       .findBysubcategoryNameContaining(this.word)
  //       .subscribe(
  //         (data) => {
  //           this.souscategories = data;
  //           this.souscategories.map((el: any) => {
  //             el.categoryName = el.category?.categoryName;
  //           });
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //   } else {
  //     this.retrieveSouscategories();
  //     this.getData();
  //   }
  }
  }

