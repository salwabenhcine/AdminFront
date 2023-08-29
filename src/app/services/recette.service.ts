import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Produit } from '../models/produit.model';
import { Recette } from '../models/recette.model';
import { AuthentificationService } from './authentification.service';

const baseUrl = 'http://localhost:8083/api/recette/';

const httpOptions = {
  headers: new HttpHeaders().append('Content-Type', 'multipart/form-data'),

};
@Injectable({
  providedIn: 'root',
})
export class RecetteService {
  private baseUrl = 'http://localhost:8083/api/recette/';
  host: string = 'http://localhost:8083/api/recette';
  list: any = [];
  id?: any;
  categoryId?:any;
  subCategoryId?: any;
  public formData?: FormGroup;
  productId?: any;
  constructor(private http: HttpClient, private auth: AuthentificationService) {}

  getAll(): Observable<Recette[]> {
    return this.http.get<Recette[]>(this.baseUrl);
  }
  createData(
    file: File,
    description: string,
    nomRecette: string,
    products: number[]
  ): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('nomRecette', nomRecette);
    formData.append('description', description);
    formData.append('products',  products.join(','));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);

    const req = new HttpRequest('POST', `${this.baseUrl}upload`, formData, {
      headers,
      reportProgress: true,
      responseType: 'json',

    });

    return this.http.request(req);
  }

  updateData(
    id: number,
    file: File,
    description: string,
    nomRecette: string,
    products: number[],
  ): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('id', id.toString());
    formData.append('file', file);
    formData.append('nomRecette', nomRecette);
    formData.append('description', description);
   formData.append('products', products.join(','));


    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);

    const req = new HttpRequest(
      'PUT',
      `${this.baseUrl}update/${id}`,
      formData,
      {
        headers, // set headers
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }

  getData(id: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  deleteData(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);

    return this.http.delete(`${this.baseUrl}delete/${id}`, {
      headers,
      responseType: 'text',
    });
  }

  findBynameContaining(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}recettes?nomRecette=${name}`);
  }

  // nbrProduit(): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}nbrProduit`);
  // }

}
