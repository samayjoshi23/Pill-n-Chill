import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/OrdersModel';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {


  roleMessage: string = '';
  roleStatus: string = '';
  orderList: Order[] = [];

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    let uid = localStorage.getItem('uid');
    this.orderService.getUserOrders(uid).subscribe({
      next: (result) => {
        this.orderList = result;
      },
      error: (response) => {
        console.log(response);
      }
    })

  }
  
  responseStatus(message: string, status: string){
    this.roleMessage = message;
    this.roleStatus = status;
    
    setTimeout(() => {
      this.roleMessage = '';
      this.roleStatus = '';
    }, 5000);
  }

  cancelOrder(id: string){
    this.orderService.cancelOrder(id).subscribe({
      next: (result) => {
        this.responseStatus(`Order Cancelled`, "success");
        this.ngOnInit();
      },
      error: (response) => {
        this.responseStatus(`Order could not be cancelled due to some reasons.`, "error");
      }
    });
  }
}
