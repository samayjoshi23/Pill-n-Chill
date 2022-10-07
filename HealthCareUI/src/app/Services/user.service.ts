import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, private router: Router, public auth: AuthServiceService) { }

  
  private isAuthToken(){
    if(!localStorage.getItem('authToken')){
      return "Error";
    }
    let token = localStorage.getItem('authToken');
    return token;
  }

  getUser(id: string):Observable<any>{
    let token = this.isAuthToken();
    if(token == "Error"){
      this.router.navigate(['/login']);
    }
    return this.http.get<any>(`https://localhost:7105/api/admin/users/${id}`, { headers: new HttpHeaders({'Authorization': `Bearer ${token}`} )} );
  }
}
