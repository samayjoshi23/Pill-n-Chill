import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/OrdersModel';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  allOrders: Order[] = [];

  orderStatus : any[]= [
    {
      name: 'Order Placed',
      value: 'placed'
    },
    {
      name: 'Shipped',
      value: 'shipped'
    },
    {
      name: 'Delivered',
      value: 'delivered'
    },
    {
      name: 'Cancelled',
      value: 'cancelled'
    },
  ];

  roleMessage: string = '';
  roleStatus: string = '';

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (result) => {
        this.allOrders = result;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  
  responseStatus(message: string, status: string){
    this.roleMessage = message;
    this.roleStatus = status;
    
    setTimeout(() => {
      this.roleMessage = '';
      this.roleStatus = '';
    }, 5000);
  }

  updateOrderStatus(id: string){
    let selector = document.querySelector(`#status${id}`) as HTMLSelectElement;
    let newStatus = 'placed';

    this.orderStatus.forEach( status => {
      if(status.value == selector.value){
        newStatus = status.name;
      }
    })
  

    this.orderService.updateOrderStatus(id, newStatus).subscribe({
      next: (response) => {
        this.responseStatus(`Success fully changed the status.`, "success");
        this.ngOnInit();
      },
      error: (response) => {
        this.responseStatus(`Something went wrong, server error.`, "error");
      },
    });
  }

}
