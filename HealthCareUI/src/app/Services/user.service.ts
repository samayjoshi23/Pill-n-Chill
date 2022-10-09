import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  adminApiUrl: string = environment.usersApiUrl_Admin;
  userApiUrl: string = environment.usersApiUrl_User;


  constructor(private http : HttpClient, private router: Router, public auth: AuthServiceService) { }

// ========================== Token Authentication ===================
  private isAuthToken(){
    if(!localStorage.getItem('authToken')){
      this.router.navigate(['/login']);
      return 'error';
    }
    return localStorage.getItem('authToken');
  }


// ========================== User Routes ==========================

  getUser(id: string):Observable<any>{
    return this.http.get<any>((this.adminApiUrl + `/${id}`), { headers: new HttpHeaders({'Authorization': `Bearer ${this.isAuthToken()}`} )} );
  }
  
  updateUserDetails(id: string, user: any):Observable<any>{
    return this.http.put<any>((this.userApiUrl + `/${id}`), user, { headers: new HttpHeaders({'Authorization': `Bearer ${this.isAuthToken()}`} )} );
  }


// ========================= Admin Routes ==========================

  getAllUsers():Observable<any[]>{
    return this.http.get<any[]>(this.adminApiUrl, { headers: new HttpHeaders({'Authorization': `Bearer ${this.isAuthToken()}`} )} );
  }
  
  changeUserRole(id: string, role: string):Observable<any>{
    return this.http.put<any>(`${this.adminApiUrl}/${id}?newRole=${role}`, role, { headers: new HttpHeaders({'Authorization': `Bearer ${this.isAuthToken()}`} )} );
  }
}

