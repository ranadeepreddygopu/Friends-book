import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserDetails } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http:HttpClient) { }

  public getUsers():Observable<IUserDetails>{
    return  this.http.get<IUserDetails>('http://localhost:3000/users')
   }

   public AddUser(userData:IUserDetails):Observable<IUserDetails>{
    return  this.http.post<IUserDetails>('http://localhost:3000/users',userData)
   }

   public updateUser(userData:IUserDetails,id:number):Observable<IUserDetails>{
    return  this.http.put<IUserDetails>(`http://localhost:3000/users/${id}`,userData)
   }

   public deleteUser(id:number):Observable<any>{
    return  this.http.delete<any>(`http://localhost:3000/users/${id}`)
   }
}
