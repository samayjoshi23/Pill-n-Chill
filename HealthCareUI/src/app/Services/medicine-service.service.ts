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
  
  private MedicineBaseUrl: string = environment.medicineApiUrl;
  private AdminApiBaseUrl: string = environment.medicineApiUrlAdmin;

  constructor(private http : HttpClient, private router: Router){ }

// ========================== Token Authentication ===================
  private isAuthToken(){
    if(!localStorage.getItem('authToken')){
      this.router.navigate(['/login']);
      return 'error';
    }
    return localStorage.getItem('authToken');
  }



// ========================== User Routes =========================

  getTop6():Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.MedicineBaseUrl + '/popular');    
  }

  GetMedicines(category: string, type: string):Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${this.MedicineBaseUrl}?category=${category}&type=${type}`);
  }

  getMedicine(id: string):Observable<Medicine> {
    return this.http.get<Medicine>(`${this.MedicineBaseUrl}/${id}`);
  }


// =============== ADMIN Routes =======================

  getAllMedicines():Observable<Medicine[]>{
    return this.http.get<Medicine[]>(this.AdminApiBaseUrl, { headers: new HttpHeaders({'Authorization': `Bearer ${this.isAuthToken()}`} )} );
  }

  addMedicine( medicine: Medicine):Observable<Medicine>{
    return this.http.post<Medicine>((this.AdminApiBaseUrl + '/product'), medicine, { headers: new HttpHeaders({'Authorization': `Bearer ${this.isAuthToken()}`} )} );
  }

  updateMedicine(id: string, medicine: Medicine):Observable<Medicine>{
    return this.http.put<Medicine>((this.AdminApiBaseUrl + `/${id}`), medicine, { headers: new HttpHeaders({'Authorization': `Bearer ${this.isAuthToken()}`} )} );
  }

  removeMedicine(id: string):Observable<Medicine>{
    return this.http.delete<Medicine>((this.AdminApiBaseUrl+ `/${id}`), { headers: new HttpHeaders({'Authorization': `Bearer ${this.isAuthToken()}`} )} );
  }


}