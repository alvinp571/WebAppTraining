import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partner } from '../model/partner';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  
  private url: string = 'http://localhost:3006/freelancers';
  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-type':'application/json'})
  }

  getPartners():Observable<Partner[]>{
    return this.http.get<Partner[]>(this.url);
  }

  getPartner(id:number): Observable<Partner>{
    const urlByID = `${this.url}/${id}`
    return this.http.get<Partner>(urlByID);
  }

  addPartner(partner:Partner): Observable<Partner>{
    return this.http.post<Partner>(this.url, partner, this.httpOptions);
  }

  updatePartner(partner:Partner): Observable<Partner>{
    return this.http.put<Partner>(`${this.url}/${partner.id}`, partner, this.httpOptions)
  }

  deletePartner(id:Number): Observable<Partner>{
    return this.http.delete<Partner>(`${this.url}/${id}`, this.httpOptions)
  }

}
