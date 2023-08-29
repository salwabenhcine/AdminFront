import { Injectable } from '@angular/core';
import { HttpClient , HttpContext, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie.model';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
const baseUrl = 'http://localhost:8083/api/category/';

const httpOptions = {
  headers: new HttpHeaders().append('Content-Type', 'multipart/form-data')
};


@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private baseUrl = 'http://localhost:8083/api/category/';
  host: string = 'http://localhost:8083/api/category'
  public formData?:  FormGroup;
  categoryId?:any;

list : any;
//categoryName? : string ; description? : string;
  constructor(private http: HttpClient) { }

  getAll(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(baseUrl);
  }

  getData(categoryId: string): Observable<Object> {
    console.log(categoryId);

    return this.http.get(`${this.baseUrl}${categoryId}`);
  }

createData(  file: File, nomcategorie:string, description:string  ): Observable<HttpEvent<any>>
{
    const formData: FormData = new FormData() ;
    formData.append('file', file);

    formData.append('nomcategorie', nomcategorie);
    formData.append('description', description);


    const req = new HttpRequest('POST', `${this.baseUrl}upload`, formData,
    {
      reportProgress: true,
      responseType: 'json',


    } );

    return this.http.request(req);
  }

  updateData( idcategorie: string, file: File, nomcategorie:string, description:string  ): Observable<HttpEvent<any>>
{
    const formData: FormData = new FormData() ;
    formData.append('idcategorie', idcategorie);
    formData.append('file', file);

    formData.append('nomcategorie', nomcategorie);
    formData.append('description', description);


    const req = new HttpRequest('PUT', `${this.baseUrl}update/${idcategorie}`, formData,
    {
      reportProgress: true,
      responseType: 'json',


    } );

    return this.http.request(req);
  }

  deleteData(idcategorie: string): Observable<any> {

    return this.http.delete(`${this.baseUrl}delete/${idcategorie}`, { responseType: 'text' });
  }

  findByCategoryNameContaining(nomcategorie: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}categories?categoryName=${nomcategorie}`);
  }
}
