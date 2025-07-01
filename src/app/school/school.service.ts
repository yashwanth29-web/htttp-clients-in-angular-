import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private apiUrl = 'http://localhost:3000/school';

  constructor(private http: HttpClient) {}

  getSchoolInfo(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteSchool(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateSchool(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  addSchool(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
