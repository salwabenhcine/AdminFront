import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Promotion } from 'src/app/models/promotion.model';
import { PromotionService } from 'src/app/services/promotion.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-detail-order',
  templateUrl: './Detail-order.component.html',
 // styleUrls: ['./Detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {

  id: any;
  orders: any;
  order: any;

    constructor(private httpClient: HttpClient,
      public toastr: ToastrService,
      private token: TokenStorageService,
      private route: ActivatedRoute,
      private router: Router) {}
     ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getByOrderId(this.id)
      .subscribe(
        data => {
          console.log(data);
          this.orders = data;
          this.order = data[0];
        },
        error => {
          console.log(error);
        });
    }

    getByOrderId(orderId:string): Observable<any[]> {
      return this.httpClient.get<any[]>(`http://localhost:8080/api/order/productCheckoutCart/${orderId}`);
    }
}