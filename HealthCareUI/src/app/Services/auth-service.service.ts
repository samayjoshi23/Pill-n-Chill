import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../Models/LoginModel';
import { Register } from '../Models/RegisterModel';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  AuthApiURL: string = 'https://localhost:7105/api/Auth/';

  constructor(private http : HttpClient) { }

  isLoggedIn(){
    if(localStorage.getItem('authToken')){
      return true;
    }

    return false;
  }

  isUser(){
    if(localStorage.getItem('role') === 'user'){
      return true;
    }

    return false;
  }

  login(loginData: Login):Observable<any>{
    return this.http.post<any>(this.AuthApiURL+'login', loginData);
  }

  register(registerData: Register){
    return this.http.post<any>(this.AuthApiURL+'register', registerData);
  }

}
