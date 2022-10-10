import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/Models/OrdersModel';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-billing-page',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.css'],
})
export class BillingPageComponent implements OnInit {
  cardType: string = '';
  paymentMethod: string = '';

  month: number = 1;
  year: number = 2022;
  cardExpDate: string = '';

  cardData: any = {
    cardNumber: 0,
    cardHolder: '',
    expDate: '',
    cvv: 0,
  };
  upiData: any = {
    contact: 0,
    vpa: '',
  };

  ProductDetails: any;

  newOrder: Order = {
    orderId: "",
    userId: "",
    productId: "",
    firstName: "",
    lastName: "",
    phone: 0,
    street: "",
    city: "",
    state: "",
    country: "",
    zip: 0,
    productName: "",
    quantity: 0,
    total: 0,
    orderDate: null,
    orderStatus: "",
    paymentStatus: "",
    paymentMode: ""
  }

  constructor(
    private ActRouter: ActivatedRoute,
    private router: Router,
    private orderService: OrdersService
  ) {}

  ngOnInit(): void {
    this.cardType = this.ActRouter.snapshot.params['cardType'];
    if (this.cardType === 'cod') {
      this.paymentMethod = 'Cash On Delivery';
    } else if (this.cardType === 'debit-card') {
      this.paymentMethod = 'Debit Card';
    } else if (this.cardType === 'credit-card') {
      this.paymentMethod = 'Credit Card';
    } else if (this.cardType === 'UPI') {
      this.paymentMethod = 'Unified Payment Interface (UPI)';
    }
    
    this.ProductDetails = {
      order: JSON.parse(localStorage.getItem('userData')),
      product: JSON.parse(localStorage.getItem('productData')),
      uid: localStorage.getItem('uid')
    }
  
    console.log(this.ProductDetails);
  }

  popupClass: string = 'popup-container hide';

  setOrderData(){
    this.newOrder.orderId = '00000000-0000-0000-0000-000000000000';
    this.newOrder.userId = this.ProductDetails.uid;
    this.newOrder.productId = this.ProductDetails.product.medicineId;
    this.newOrder.firstName = this.ProductDetails.order.firstName;
    this.newOrder.lastName = this.ProductDetails.order.lastName;
    this.newOrder.phone = parseInt(this.ProductDetails.order.phone);
    this.newOrder.street = this.ProductDetails.order.street;
    this.newOrder.city = this.ProductDetails.order.city;
    this.newOrder.state = this.ProductDetails.order.state;
    this.newOrder.country = this.ProductDetails.order.country;
    this.newOrder.zip = this.ProductDetails.order.zip;
    this.newOrder.productName = this.ProductDetails.product.name;
    this.newOrder.quantity = this.ProductDetails.order.quantity;
    this.newOrder.total = this.ProductDetails.order.total;
    this.newOrder.orderDate = null;
    this.newOrder.orderStatus = 'Placed';
    this.newOrder.paymentMode = this.paymentMethod;
    if(this.cardType == 'cod'){
      this.newOrder.paymentStatus = 'Pending';
    }
    else {
      this.newOrder.paymentStatus = 'Done';
    }
  }

  confirmOrder(){
    this.popupClass= 'popup-container show';
    setTimeout(()=> {
      this.popupClass= 'popup-container hide';
      this.router.navigate(['/orders']);
    }, 3600);
  }

  
  purchase() {
    this.setOrderData();
    this.orderService.generateNewOrder(this.newOrder).subscribe({
      next: (result) => {
        console.log(result);
        this.confirmOrder();
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}
