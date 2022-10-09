import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/OrdersModel';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {


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

  cancelOrder(id: string){
    this.orderService.cancelOrder(id).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}
