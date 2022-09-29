import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-billing-page',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.css']
})
export class BillingPageComponent implements OnInit {

  cardType: string = '';
  paymentMethod: string = '';

  cardData : any = {
    cardNumber: 0,
    cardHolder: '',
    expDate: '',
    cvv: 0
  }
  upiData: any = {
    phone: 0,
    vpa: ''
  }


  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.cardType = this.router.snapshot.params['cardType'];
    if(this.cardType === 'cod'){
      this.paymentMethod = 'Cash On Delivery';
    }
    else if(this.cardType === "debit-card"){
      this.paymentMethod = 'Debit Card';
    }
    else if(this.cardType === "credit-card"){
      this.paymentMethod = 'Credit Card';
    }
    else if(this.cardType === "UPI"){
      this.paymentMethod = 'Unified Payment Interface (UPI)';
    }
  }
  purchase(){
    
  }
}
