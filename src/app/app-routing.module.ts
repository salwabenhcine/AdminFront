import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { AddMarqueComponent } from './components/add-marque/add-marque.component';
import { AddProduitComponent } from './components/add-produit/add-produit.component';
import { AddPromotionComponent } from './components/add-promotion/add-promotion.component';
import { AddRecetteComponent } from './components/add-recette/add-recette.component';
import { AddSouscategorieComponent } from './components/add-souscategorie/add-souscategorie.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { MarqueListComponent } from './components/marque-list/marque-list.component';
import { ProduitListComponent } from './components/produit-list/produit-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { RecetteListComponent } from './components/recette-list/recette-list.component';
import { SouscategoriesListComponent } from './components/souscategories-list/souscategories-list.component';
import { UpdateCategorieComponent } from './components/update-categorie/update-categorie.component';
import { UpdateMarqueComponent } from './components/update-marque/update-marque.component';
import { UpdateProduitComponent } from './components/update-produit/update-produit.component';
import { DetailOrderComponent } from './components/detail-order/detail-order.component';
import { UpdateSouscategorieComponent } from './components/update-souscategorie/update-souscategorie.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UpdateRecetteComponent } from './components/update-recette/update-recette.component';


const routes: Routes = [
 { path: 'home', component: HomeComponent },
 { path: 'navbar', component: NavbarComponent },
 { path: 'add-categorie', component: AddCategorieComponent },
 { path: 'add-marque', component: AddMarqueComponent },
 { path: 'add-produit', component: AddProduitComponent },
 { path: 'add-promotion', component: AddPromotionComponent },
 { path: 'add-recette', component: AddRecetteComponent },
 { path: 'edit-recette/:id', component: UpdateRecetteComponent },
 { path: 'recettes', component: RecetteListComponent },
 { path: 'edit-categorie/:id', component: UpdateCategorieComponent },
 { path: 'edit-marque/:id', component: UpdateMarqueComponent },
 { path: 'edit-produit/:id', component: UpdateProduitComponent },
 { path: 'detail-order/:id', component: DetailOrderComponent },
 { path: 'edit-souscategorie/:id', component: UpdateSouscategorieComponent },
 { path: 'categories', component: CategoriesListComponent },

  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent },
  //{ path: 'profile', component: ProfileComponent },
 // { path: 'user', component: BoardUserComponent },
 // { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
 { path: '', redirectTo: 'login', pathMatch: 'full' }


];
// const routes1: Routes = [{ path: 'categories', component: CategoriesListComponent }];
const routes2: Routes = [{ path: 'categorie', component: AddCategorieComponent  }];
const routes3: Routes = [{ path: 'souscategories', component: SouscategoriesListComponent }];
const routes4: Routes = [{ path: 'addsouscategorie', component: AddSouscategorieComponent  }];
const routes5: Routes = [{ path: 'marques', component: MarqueListComponent }];
const routes6: Routes = [{ path: 'marque', component: AddMarqueComponent  }];
const routes7: Routes = [{ path: 'produits', component: ProduitListComponent }];
const routes8: Routes = [{ path: 'produit', component: AddProduitComponent  }];
const routes9: Routes = [{ path: 'orders', component: OrderListComponent }];
const routes10: Routes = [{ path: 'promotion', component: AddPromotionComponent  }];
const routes11: Routes = [{ path: 'users', component: UsersListComponent }];
const routes12: Routes = [{ path: 'recettes', component: RecetteListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)
    //  RouterModule.forRoot(routes1)
         , RouterModule.forRoot(routes2), RouterModule.forRoot(routes3)
         , RouterModule.forRoot(routes4), RouterModule.forRoot(routes5)
         , RouterModule.forRoot(routes6), RouterModule.forRoot(routes7)
         , RouterModule.forRoot(routes8), RouterModule.forRoot(routes9)
         , RouterModule.forRoot(routes10), RouterModule.forRoot(routes11)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
