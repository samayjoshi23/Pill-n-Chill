import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../Models/LoginModel';
import { Register } from '../Models/RegisterModel';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http : HttpClient) { }

  login(loginData: Login):Observable<any>{
    return this.http.post<any>('https://localhost:7105/api/Auth/login', loginData);
  }

  register(registerData: Register){
    return this.http.post<any>('https://localhost:7105/api/Auth/register', registerData);
  }
}
