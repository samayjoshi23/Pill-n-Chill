import { Injectable } from '@angular/core';
import { Medicine } from '../Models/MedicideModel';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class MedicineServiceService {
  
  MedicineBaseUrl: string = environment.medicineApiUrl;


  constructor(private http : HttpClient, private router: Router){ }

  private isAuthToken(){
    if(!localStorage.getItem('authToken')){
      return "Error";
    }
    let token = localStorage.getItem('authToken');
    return token;
  }

  getTop6():Observable<Medicine[]> {
    let token = this.isAuthToken();
    if(token == "Error"){
      this.router.navigate(['/login']);
    }
    return this.http.get<Medicine[]>(this.MedicineBaseUrl + '/popular', { headers: new HttpHeaders({'Authorization': `Bearer ${token}`} )});    
  }

  GetMedicines(category: string, type: string):Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${this.MedicineBaseUrl}?category=${category}&type=${type}`);
  }

  getMedicine(id: number):Observable<Medicine> {
    return this.http.get<Medicine>(`${this.MedicineBaseUrl}/${id}`);
  }

}