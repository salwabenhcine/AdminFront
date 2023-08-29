import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Souscategorie } from '../models/souscategorie.model';
import { Categorie } from '../models/categorie.model';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';

  const baseUrl = 'http://localhost:8083/api/subcategory';

const httpOptions = {
  headers: new HttpHeaders().append('Content-Type', 'multipart/form-data')
};
@Injectable({
  providedIn: 'root'
})
export class SouscategorieService {
  private baseUrl = 'http://localhost:8083/api/subcategory/';
  host: string = 'http://localhost:8083/api/subcategory'

  idsouscategorie: any;
  idcategorie: any;
  choixmenu: string = 'A';
  list:  any = [];
  public formData?  : FormGroup;
  constructor(private http: HttpClient) { }

  getAll(): Observable<Souscategorie[]> {

    return this.http.get<Souscategorie[]>(this.baseUrl);
  }
  createData(  file: File, nomsouscat:string, description:string, idcategorie: number  ): Observable<HttpEvent<any>>
{
    const formData: FormData = new FormData() ;
    formData.append('file', file);

    formData.append('nomsouscat', nomsouscat);
    formData.append('description', description);
    formData.append('idcategorie', idcategorie.toString());


    const req = new HttpRequest('POST', `${this.baseUrl}upload`, formData,
    {
      reportProgress: true,
      responseType: 'json',


    } );

    return this.http.request(req);
  }

  updateData(idsouscategorie: number, file: File, nomsouscat:string, description:string, idcategorie: number): Observable<HttpEvent<any>>
{
    const formData: FormData = new FormData() ;
    formData.append('idsouscategorie', idsouscategorie.toString());
    formData.append('file', file);

    formData.append('nomsouscat', nomsouscat);
    formData.append('description', description);
    console.log(idcategorie);
    formData.append('idcategorie', idcategorie.toString());


    const req = new HttpRequest('PUT', `${this.baseUrl}update/${this.idsouscategorie}`, formData,
    {
      reportProgress: true,
      responseType: 'json',


    } );

    return this.http.request(req);
  }

  getData(idsouscategorie: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}${idsouscategorie}`);
  }

  deleteData(idsouscategorie: string): Observable<any> {

    return this.http.delete(`${this.baseUrl}delete/${idsouscategorie}`, { responseType: 'text' });
  }

  findBynomsouscatContaining(nomsouscat: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}subcategories?nomsouscat=${nomsouscat}`);
  }

  /*getData(id: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getNumero(code : string) {
    return this.http.get(`${this.baseUrl}/7/${code}`);
  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }

  updatedata(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteData(id: string): Observable<any> {

    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  listScateg(code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/5/${code}`);
  }

  getExcelData(){
      return this.http.get<any>(`${this.baseUrl}/export/excel`, { responseType: 'arraybuffer' as 'json' });
    }

  */
}
