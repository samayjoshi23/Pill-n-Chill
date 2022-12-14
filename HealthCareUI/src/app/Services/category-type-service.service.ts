import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../Models/CategoryModel';
import { MedicineType } from '../Models/TypesModel';

@Injectable({
  providedIn: 'root',
})
export class CategoryTypeServiceService {
  // categories: Category[] = [
  //   { categoryId: 1001, urlName: 'all', categoryName: 'All', url: '' },
  //   {
  //     categoryId: 1002,
  //     urlName: 'general',
  //     categoryName: 'General Medicines',
  //     url: 'fa fa-light fa-capsules',
  //   },
  //   {
  //     categoryId: 1003,
  //     urlName: 'baby',
  //     categoryName: 'Baby Care',
  //     url: 'fa fa-solid fa-baby',
  //   },
  //   {
  //     categoryId: 1004,
  //     urlName: 'skin',
  //     categoryName: 'Skin Care',
  //     url: 'fa fa-duotone fa-child-reaching',
  //   },
  //   {
  //     categoryId: 1005,
  //     urlName: 'surgical',
  //     categoryName: 'Surgical Items',
  //     url: 'fa fa-solid fa-mask-face',
  //   },
  //   {
  //     categoryId: 1006,
  //     urlName: 'vitamin',
  //     categoryName: 'Vitamins',
  //     url: 'fa-solid fa-prescription-bottle-medical',
  //   },
  // ];

  categoryApiUrl: string = environment.categoriesApiUrl;

  types: MedicineType[] = [
    { typeId: 2001, value: 'all', name: 'All' },
    { typeId: 2002, value: 'tablet', name: 'Tablets' },
    { typeId: 2003, value: 'syrup', name: 'Syrups' },
    { typeId: 2004, value: 'injection', name: 'Injections' },
    { typeId: 2005, value: 'spray', name: 'Spray' },
    { typeId: 2006, value: 'gel', name: 'Gel' },
    { typeId: 2007, value: 'cream', name: 'Cream' },
    { typeId: 2008, value: 'powder', name: 'Powder' },
    { typeId: 2009, value: 'capsule', name: 'Capsule' },
    { typeId: 2010, value: 'combo', name: 'Combos' },
  ];

  constructor(private http : HttpClient, private router: Router) {}


// ========================== Token Authentication ===================
  private isAuthToken(){
    if(!localStorage.getItem('authToken')){
      this.router.navigate(['/login']);
      return 'error';
    }
    return localStorage.getItem('authToken');
  }

// ========================== User Routes =========================

  getTypes(){    
    return this.types;
  }
  
  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.categoryApiUrl);
  }


// =============== ADMIN Routes =======================

  getOneCategory(id: number):Observable<Category>{
    return this.http.get<Category>((this.categoryApiUrl + id), { headers: new HttpHeaders({'Authorization': `Bearer ${this.isAuthToken()}`} )} );
  }
  
  addCategory(newCategory: Category):Observable<Category>{
    return this.http.post<Category>(this.categoryApiUrl + 'add', newCategory, { headers: new HttpHeaders({'Authorization': `Bearer ${this.isAuthToken()}`} )} )
  }
  
  updateCategory(id: number, category: Category):Observable<Category>{
    return this.http.put<Category>((this.categoryApiUrl + id), category, { headers: new HttpHeaders({'Authorization': `Bearer ${this.isAuthToken()}`} )} )
  }
  
  removeCategory(id: number):Observable<Category>{
    return this.http.delete<Category>((this.categoryApiUrl + id), { headers: new HttpHeaders({'Authorization': `Bearer ${this.isAuthToken()}`} )} )
  }

}