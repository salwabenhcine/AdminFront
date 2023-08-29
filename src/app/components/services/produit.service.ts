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

const baseUrl = 'http://localhost:8083/api/product/';

const httpOptions = {
  headers: new HttpHeaders().append('Content-Type', 'multipart/form-data'),
};

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private baseUrl = 'http://localhost:8083/api/product/';
  host: string = 'http://localhost:8083/api/product';
  list: any = [];
  id?: any;
  categoryId?:any;
  subCategoryId?: any;
  marqueId?: any;
  public formData?: FormGroup;
  productId?: any;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.baseUrl);
  }
  createData(
    file: File,
    // id: number,
    description: string,
    idcategorie: number,
    name: string,
    codebarre: string,
    prix_de_vente: number,
    unite: string,
    qte: number,
    available: boolean,
    idsouscategorie: number,
    idmarque: number
  ): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    // formData.append('id', id.toString());
    formData.append('name', name);
    formData.append('codebarre', codebarre);
    formData.append('prix_de_vente', prix_de_vente.toString());
    formData.append('description', description);
    formData.append('unite', unite);
    formData.append('qte', qte.toString());
    formData.append('available', available.toString());
    formData.append('idcategorie', idcategorie.toString());
    formData.append('idsouscategorie', idsouscategorie.toString());
    formData.append('idmarque', idmarque.toString());

    const req = new HttpRequest('POST', `${this.baseUrl}upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  updateData(
    code: number,
    file: File,
    name: string,
    codebarre: string,
    prix_de_vente: number,
    description: string,
    unite: string,
    qte: number,
    available: boolean,
    idcategorie: number,
    idsouscategorie: number,
    nommarque: string
  ): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('code', code.toString());
    formData.append('file', file);
    formData.append('name', name);
    formData.append('codebarre', codebarre);
    formData.append('prix_de_vente', prix_de_vente.toString());
    formData.append('description', description);
    formData.append('unite', unite);
    formData.append('qte', qte.toString());
    formData.append('available', available.toString());
    formData.append('idcategorie', idcategorie.toString());
    formData.append('idsouscategorie', idsouscategorie.toString());
    formData.append('nommarque', nommarque);

    const req = new HttpRequest('PUT',`${this.baseUrl}update/${code}`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }

  getData(code: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}${code}`);
  }

  deleteData(code: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete/${code}`, {
      responseType: 'text',
    });
  }

  findBynameContaining(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}produiits?name=${name}`);
  }



}
