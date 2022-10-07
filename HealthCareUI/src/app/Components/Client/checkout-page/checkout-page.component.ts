import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {

  ProductOrderInfo: any = {
    firstName: '',
    lastName: '',
    phone: 0,
    street: '',
    city: '',
    state: '',
    country: '',
    quantity: 0,
    total: 0,
    orderDate : null,
    orderStatus: '',
    paymentStatus: '',
    paymentMode: ''
  };

  isLoggedIn : boolean = false;
  
  credentialValidity: string = '';
  credentialValidityMsg: string = '';


  checkoutForm: FormGroup;

  constructor(private router: Router, public auth: AuthServiceService) { }

  ngOnInit(): void {
    this.isLoggedIn =  this.auth.isLoggedIn();
    if(!localStorage.getItem('authToken')){
      this.credentialValidity = 'invalid';
    }

    this.checkoutForm = new FormGroup({
      personalDetails: new FormGroup({
        firstName: new FormControl( this.ProductOrderInfo.firstName , [Validators.required,Validators.minLength(2),]),
        lastName: new FormControl( this.ProductOrderInfo.lastName , [Validators.required,Validators.minLength(2),]),
        email: new FormControl( this.ProductOrderInfo.email , [Validators.required, Validators.email]),
        phone: new FormControl( this.ProductOrderInfo.phone , [Validators.required,Validators.maxLength(14),Validators.minLength(10),]),
      }),
      shippingDetails: new FormGroup({
        street: new FormControl( this.ProductOrderInfo.street , [Validators.required,Validators.minLength(8),]),
        city: new FormControl( this.ProductOrderInfo.city , [Validators.required,Validators.minLength(3),]),
        state: new FormControl( this.ProductOrderInfo.state , [Validators.required,Validators.minLength(5),]),
        country: new FormControl(this.ProductOrderInfo.country, [Validators.required,Validators.minLength(3),]),
        zip: new FormControl(this.ProductOrderInfo.zip, [Validators.required,Validators.maxLength(6),Validators.minLength(6),]),
      }),
      paymentMethod: new FormControl(this.ProductOrderInfo.paymentMethod, Validators.required),
    });
  }

  proceedToBill() {
    this.ProductOrderInfo.firstName = this.checkoutForm.value.personalDetails.firstName;
    this.ProductOrderInfo.lastName = this.checkoutForm.value.personalDetails.lastName;
    this.ProductOrderInfo.email = this.checkoutForm.value.personalDetails.email;
    this.ProductOrderInfo.phone = parseInt(this.checkoutForm.value.personalDetails.phone);
    this.ProductOrderInfo.street = this.checkoutForm.value.shippingDetails.street;
    this.ProductOrderInfo.city = this.checkoutForm.value.shippingDetails.city;
    this.ProductOrderInfo.state = this.checkoutForm.value.shippingDetails.state;
    this.ProductOrderInfo.country = this.checkoutForm.value.shippingDetails.country;
    this.ProductOrderInfo.zip = parseInt(this.checkoutForm.value.shippingDetails.zip);
    this.ProductOrderInfo.paymentMode = this.checkoutForm.value.paymentMethod;
    

    let productData = JSON.parse(localStorage.getItem('productData'));
    this.ProductOrderInfo.total = (productData.qty * productData.price).toFixed(2);
    this.ProductOrderInfo.quantity = productData.qty;


    let orderData = JSON.stringify(this.ProductOrderInfo);
    localStorage.setItem("userData", orderData);
    
    this.router.navigate([`/products/billing/${this.checkoutForm.value.paymentMethod}`]);
  }
}
