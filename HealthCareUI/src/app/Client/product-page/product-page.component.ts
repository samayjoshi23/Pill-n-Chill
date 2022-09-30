import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  quantity: number = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  increaseCount(){
    if(this.quantity === 15){
      return;
    }
    this.quantity++;
  }
  decreaseCount(){
    if(this.quantity === 1){
      return;
    }
    this.quantity--;
  }

}
