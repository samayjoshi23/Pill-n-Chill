import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../Models/OrdersModel';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orderApi: string = 'https://localhost:7105/api/users';
  orderAdminApi: string = 'https://localhost:7105/api/admin';

  constructor(
    private http: HttpClient,
    private auth: AuthServiceService,
    private router: Router
  ) {}

  // ========================== Token Authentication ===================
  private isAuthToken() {
    if (!localStorage.getItem('authToken')) {
      this.router.navigate(['/login']);
      return 'error';
    }
    return localStorage.getItem('authToken');
  }

// ========================== User Routes ==========================
  
  generateNewOrder(newOrder: Order): Observable<Order> {
    return this.http.post<Order>(this.orderApi + '/order', newOrder, { headers: new HttpHeaders({Authorization: `Bearer ${this.isAuthToken()}`}) });
  }

  getUserOrders(uid: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderApi + '/orders/' + uid, {headers: new HttpHeaders({Authorization: `Bearer ${this.isAuthToken()}`}) });
  }

  cancelOrder(id: string) {
    return this.http.delete(this.orderApi + '/orders/' + id, {headers: new HttpHeaders({Authorization: `Bearer ${this.isAuthToken()}`}) });
  }

// ========================== Admin Routes ==========================

  updateOrderStatus(id: string, newStatus: string): Observable<Order> {
    return this.http.put<Order>(`${this.orderAdminApi}/orders/${id}?updateOrder=${newStatus}`, newStatus, { headers: new HttpHeaders({ Authorization: `Bearer ${this.isAuthToken()}`})});
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderAdminApi + '/orders', { headers: new HttpHeaders({ Authorization: `Bearer ${this.isAuthToken()}`}) });
  }
}
