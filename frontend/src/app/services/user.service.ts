import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://your-api-url/api/users';

  constructor(private http: HttpClient) {}

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, userData);
  }
}
