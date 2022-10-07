import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/Models/OrdersModel';

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
    phone: 0,
    vpa: '',
  };

  ProductDetails: any;

  newOrder: Order = {
    orderId: "",
    userId: "",
    productId: "",
    firstName: "",
    lastName: "",
    contact: 0,
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
    paymentMode: "",
  }

  constructor(
    private ActRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.ProductDetails = {
      order: JSON.parse(localStorage.getItem('userData')),
      product: JSON.parse(localStorage.getItem('productData'))
    }

    console.log(this.ProductDetails);


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
  }


  purchase() {

  }
}
