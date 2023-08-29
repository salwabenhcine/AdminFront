import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
//import { UpdateCategorieComponent } from './components/update-categorie/update-categorie.component';
import { AddSouscategorieComponent } from './components/add-souscategorie/add-souscategorie.component';
import { SouscategoriesListComponent } from './components/souscategories-list/souscategories-list.component';
import { UpdateSouscategorieComponent } from './components/update-souscategorie/update-souscategorie.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DecimalPipe} from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddProduitComponent } from './components/add-produit/add-produit.component';
import { ProduitListComponent } from './components/produit-list/produit-list.component';
import { AddPromotionComponent } from './components/add-promotion/add-promotion.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { AddMarqueComponent } from './components/add-marque/add-marque.component';
import { MarqueListComponent } from './components/marque-list/marque-list.component';
import { AddRecetteComponent } from './components/add-recette/add-recette.component';
import { RecetteListComponent } from './components/recette-list/recette-list.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { HomeComponent } from './home/home.component';
import { UpdateCategorieComponent } from './components/update-categorie/update-categorie.component';
import { UpdateMarqueComponent } from './components/update-marque/update-marque.component';
import { DetailOrderComponent } from './components/detail-order/detail-order.component';
import { UpdateProduitComponent } from './components/update-produit/update-produit.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard } from './_auth/auth.guard';
import { RouterModule } from '@angular/router';
import { UpdateRecetteComponent } from './components/update-recette/update-recette.component';

registerLocaleData(en);

const MATERIAL_MODULES = [MatToolbarModule,
  MatIconModule
];


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    AddCategorieComponent,
    CategoriesListComponent,
    AddSouscategorieComponent,
    SouscategoriesListComponent,
    UpdateSouscategorieComponent,
    AddProduitComponent,
    ProduitListComponent,
    AddPromotionComponent,
    OrderListComponent,
    AddMarqueComponent,
    MarqueListComponent,
    AddRecetteComponent,
    RecetteListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardAdminComponent,
    UpdateCategorieComponent,
    UpdateMarqueComponent,
    DetailOrderComponent,
    UpdateProduitComponent,
    UsersListComponent,
    UpdateRecetteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //FormGroup,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    NgbModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    NgxPaginationModule,
    NgSelectModule, 
    RouterModule
  ],
  exports : MATERIAL_MODULES,
  providers: [authInterceptorProviders, DatePipe,DecimalPipe,{ provide: MAT_DIALOG_DATA, useValue: {} ,},{ provide: APP_BASE_HREF, useValue: '' },
  { provide: MatDialogRef, useValue: {} }, AuthGuard],
  /*providers: [ DatePipe,DecimalPipe,{ provide: NZ_I18N, useValue: en_US }
            , { provide: MAT_DIALOG_DATA, useValue: {} ,},{ provide: APP_BASE_HREF, useValue: '' },
              { provide: MatDialogRef, useValue: {}  }
              ],*/
  bootstrap: [AppComponent]
})
export class AppModule { }
