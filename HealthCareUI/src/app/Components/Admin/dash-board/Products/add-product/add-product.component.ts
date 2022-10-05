import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/Models/CategoryModel';
import { Medicine } from 'src/app/Models/MedicideModel';
import { MedicineType } from 'src/app/Models/TypesModel';
import { CategoryTypeServiceService } from 'src/app/Services/category-type-service.service';
import { MedicineServiceService } from 'src/app/Services/medicine-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  categories: Category[] = [];
  types: MedicineType[] = [];
  
  medicine: Medicine = {
    medicineId: 0,
    name: '',
    chemical: '',
    exp: '',
    mfg: '',
    qty: 0,
    power: '',
    type: '',
    description: '',
    seller: '',
    brandName: '',
    price: 0,
    url: '',
    category: '',
    categoryName: '',
  };

  monthArr : any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  yearArr : any[] = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];


  addProductForm : FormGroup = new FormGroup({
    medicineName: new FormControl("", [Validators.required,Validators.minLength(3)]),
    chemicalName: new FormControl("", [Validators.required,Validators.minLength(3)]),
    brandName: new FormControl("", [Validators.required,Validators.minLength(3)]),
    quantity: new FormControl("", [Validators.required, Validators.min(1), Validators.max(100)]),
    power: new FormControl("", [Validators.required]),
    photo: new FormControl("", [Validators.required]),
    category: new FormControl( "", [Validators.required]),
    type: new FormControl( "", [Validators.required]),
    expMonth: new FormControl( this.monthArr[0],[Validators.required]),
    expYear: new FormControl( this.yearArr[0],[Validators.required]),
    mfgMonth: new FormControl( this.monthArr[0],[Validators.required]),
    mfgYear: new FormControl( this.yearArr[0],[Validators.required]),
    price: new FormControl("", [Validators.required, Validators.pattern('^[1-9]d{0,7}(?:.d{1,4})?|.d{1,4}$')]),
    sellerName: new FormControl( "", [ Validators.required, Validators.minLength(3)]),
    description: new FormControl( "", [Validators.minLength(10)]),
  });

  constructor(    
      private MedicineService: MedicineServiceService,
      private CategoryTypeService: CategoryTypeServiceService
    ) { }

  ngOnInit(): void {
    this.types = this.CategoryTypeService.getTypes();
    this.categories = this.CategoryTypeService.getCategories();
  }

  createProduct(){
    this.medicine = this.addProductForm.value;
    // this.medicine.medicineId = '00000000-0000-0000-0000-000000000000';
    this.medicine.medicineId = 201;
    this.medicine.url = this.addProductForm.value.photo.split('\\')[2];
    this.medicine.exp = `${this.addProductForm.value.expMonth}/${this.addProductForm.value.expYear}`;
    this.medicine.mfg = `${this.addProductForm.value.mfgMonth}/${this.addProductForm.value.mfgYear}`;
    console.log(this.addProductForm.value);
  }
}
