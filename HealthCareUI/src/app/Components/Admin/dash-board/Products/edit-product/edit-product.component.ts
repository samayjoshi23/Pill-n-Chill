import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  addProductForm : FormGroup = new FormGroup({
    medicineName: new FormControl('', [Validators.required, Validators.minLength(3)]),  
    chemicalName: new FormControl('', [Validators.required, Validators.minLength(3)]),  
    brandName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    photo: new FormControl('', [Validators.required]),  
    price: new FormControl('', [Validators.required, Validators.pattern("^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$")]),  
    sellerName: new FormControl('', [Validators.required, Validators.minLength(3)])  
  });

  constructor() { }

  ngOnInit(): void {
  }

  editProduct(){
    console.log(this.addProductForm);
  }

}
