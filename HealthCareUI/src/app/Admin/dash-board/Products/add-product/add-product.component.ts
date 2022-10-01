import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm : FormGroup = new FormGroup({
    medicineName: new FormControl('', [Validators.required, Validators.minLength(4)])  
  });

  constructor() { }

  ngOnInit(): void {
  }

  createProduct(){
    console.log(this.addProductForm);
  }
}
