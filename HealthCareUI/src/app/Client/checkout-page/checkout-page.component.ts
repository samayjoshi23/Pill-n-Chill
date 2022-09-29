import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  deliveryData : any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: 0,
    street: '',
    zip: 0,
    city: '',
    state: '',
    country: '',
    cardType: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
