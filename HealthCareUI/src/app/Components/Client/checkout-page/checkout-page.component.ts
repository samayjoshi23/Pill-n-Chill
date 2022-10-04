import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  
  checkoutForm: FormGroup = new FormGroup({
    personalDetails: new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(14), Validators.minLength(10)]),
    }),
    shippingDetails: new FormGroup({
      street: new FormControl('', [Validators.required, Validators.minLength(8)]),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      state: new FormControl('', [Validators.required, Validators.minLength(5)]),
      country: new FormControl('India', [Validators.required, Validators.minLength(3)]),
      zip: new FormControl(0, [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
    }),
    paymentMethod: new FormControl('', Validators.required)
  })

  constructor() { }

  ngOnInit(): void {
  }

  proceedToBill(){
    console.log(this.checkoutForm);
  }
}
