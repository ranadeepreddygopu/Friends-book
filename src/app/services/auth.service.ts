import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // Adjust the API URL as needed
  constructor(private http: HttpClient) { }

  public login() {
    return this.http.get(`${this.apiUrl}`);
  }
  public register(userData: any) {
    userData.role ='user'
    return this.http.post(`${this.apiUrl}`, userData);
  }
}
