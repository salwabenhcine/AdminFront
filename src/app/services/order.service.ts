import { Injectable } from '@angular/core';
import { HttpClient , HttpContext, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Promotion } from '../models/promotion.model';

const baseUrl = 'http://localhost:8083/api/promotion/';

const httpOptions = {
  headers: new HttpHeaders().append('Content-Type', 'multipart/form-data')
};

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private baseUrl = 'http://localhost:8083/api/promotion/';
  host: string = 'http://localhost:8083/api/promotion'
  choixmenu: string = 'A';
  list:  any=[];
  promotionId: any;
  public formData?  : FormGroup;
    constructor(private http: HttpClient) { }

  getAll(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.baseUrl);
  }

  createData(  file: File, codeBarre:string, libelle :string, avantage:string, prixintial:number,
               prixpromo: number, canalDiffusion:string, description:string,
               dateDebutPromo: Date, dateFinPromo: Date ): Observable<HttpEvent<any>>
{
    let dateDeb = new Date(dateDebutPromo);
    let dateFin = new Date(dateFinPromo);
    const formData: FormData = new FormData() ;
    formData.append('file', file);
    formData.append('codeBarre', codeBarre);
    formData.append('libelle', libelle);
    formData.append('avantage', avantage);
    formData.append('prixintial', prixintial.toString());
    formData.append('prixpromo', prixpromo.toString());
    formData.append('canalDiffusion', canalDiffusion);
    formData.append('description', description);
    formData.append('dateDebutPromo', dateDeb.toDateString());
    formData.append('dateFinPromo', dateFin.toDateString());

    const req = new HttpRequest('POST', `${this.baseUrl}upload`, formData,
    {
      reportProgress: true,
      responseType: 'json',
    } );

    return this.http.request(req);
  }

  updateData(  promotionId: string, file: File, codeBarre:string, libelle :string, avantage:string, prixintial:number,
    prixpromo: number, canalDiffusion:string, description:string,
    dateDebutPromo: Date, dateFinPromo: Date ): Observable<HttpEvent<any>>
{
let dateDeb = new Date(dateDebutPromo);
let dateFin = new Date(dateFinPromo);
const formData: FormData = new FormData() ;
formData.append('promotionId', promotionId);
formData.append('file', file);
formData.append('codeBarre', codeBarre);
formData.append('libelle', libelle);
formData.append('avantage', avantage);
formData.append('prixintial', prixintial.toString());
formData.append('prixpromo', prixpromo.toString());
formData.append('canalDiffusion', canalDiffusion);
formData.append('description', description);
formData.append('dateDebutPromo', dateDeb.toDateString());
formData.append('dateFinPromo', dateFin.toDateString());

const req = new HttpRequest('PUT', `${this.baseUrl}update/${promotionId}`, formData,
{
reportProgress: true,
responseType: 'json',
} );

return this.http.request(req);
}


  getData(promotionId: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}${promotionId}`);
  }

  deleteData(promotionId: string): Observable<any> {

    return this.http.delete(`${this.baseUrl}delete/${promotionId}`, { responseType: 'text' });
  }

  findBylibelleContaining(libelle: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}promotions?libelle=${libelle}`);
  }

}
