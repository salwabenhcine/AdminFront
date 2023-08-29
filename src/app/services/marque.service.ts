import { Injectable } from '@angular/core';
import { HttpClient , HttpContext, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Marque } from '../models/marque.model';

const baseUrl = 'http://localhost:8083/api/marque/';

const httpOptions = {
  headers: new HttpHeaders().append('Content-Type', 'multipart/form-data')
};

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  private baseUrl = 'http://localhost:8083/api/marque/';
  host: string = 'http://localhost:8083/api/marque'
  choixmenu: string = 'A';
  list:  any=[];
  public formData?  : FormGroup;
  idmarque?: any;
    constructor(private http: HttpClient) { }

  getAll(): Observable<Marque[]> {
    return this.http.get<Marque[]>(this.baseUrl);
  }

  createData(file1 : File, nommarque: string, teleMarque: string, emailMarque: string  ): Observable<HttpEvent<any>>
{
    const formData: FormData = new FormData() ;
    formData.append('file1', file1);
    formData.append('nommarque', nommarque);
    formData.append('teleMarque', teleMarque);
    formData.append('emailMarque', emailMarque);


    const req = new HttpRequest('POST', `${this.baseUrl}upload`, formData,
    {
      reportProgress: true,
      responseType: 'json',


    } );

    return this.http.request(req);
  }

  getData(idmarque: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}${idmarque}`);
  }

  updateData( idmarque: string,file1 : File, nommarque: string, teleMarque: string,
     emailMarque: string  ): Observable<HttpEvent<any>>
  {
    const formData: FormData = new FormData() ;
    formData.append('idmarque', idmarque);
    formData.append('file1', file1);
    formData.append('nommarque', nommarque);
    formData.append('teleMarque', teleMarque);
    formData.append('emailMarque', emailMarque);


    const req = new HttpRequest('PUT', `${this.baseUrl}update/${idmarque}`, formData,
    {
      reportProgress: true,
      responseType: 'json',


    } );

    return this.http.request(req);
  }
  deleteData(idmarque: string): Observable<any> {

    return this.http.delete(`${this.baseUrl}delete/${idmarque}`, { responseType: 'text' });
  }

  findBynommarqueContaining(nommarque: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}marques?nommarque=${nommarque}`);
  }

  nbrMarque(): Observable<any> {
    return this.http.get(`${this.baseUrl}nbrMarque`);
  }

}
