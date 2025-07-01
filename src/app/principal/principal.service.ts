import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  private apiUrl = 'http://localhost:3000/principal';

  constructor(private http: HttpClient) {}

  getPrincipalInfo(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  deletePrinciple(id: number){
    return this.http.delete(this.apiUrl + "/" + id);
  }
  updatePrincipal(id: number, data: any): Observable<any>{
    return this.http.put<any>(this.apiUrl + "/"+id, data);
  }
  addPrincipal(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data); 
  }
  



}
