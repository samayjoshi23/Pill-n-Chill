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
    medicineId: '',
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
    name: new FormControl("", [Validators.required,Validators.minLength(3)]),
    chemical: new FormControl("", [Validators.required,Validators.minLength(3)]),
    brandName: new FormControl("", [Validators.required,Validators.minLength(3)]),
    qty: new FormControl("", [Validators.required, Validators.min(1), Validators.max(100)]),
    power: new FormControl("", [Validators.required]),
    url: new FormControl("", [Validators.required]),
    category: new FormControl( "", [Validators.required]),
    type: new FormControl( "", [Validators.required]),
    expMonth: new FormControl( this.monthArr[0],[Validators.required]),
    expYear: new FormControl( this.yearArr[0],[Validators.required]),
    mfgMonth: new FormControl( this.monthArr[0],[Validators.required]),
    mfgYear: new FormControl( this.yearArr[0],[Validators.required]),
    price: new FormControl("", [Validators.required, Validators.pattern('^[1-9]d{0,7}(?:.d{1,4})?|.d{1,4}$')]),
    seller: new FormControl( "", [ Validators.required, Validators.minLength(3)]),
    description: new FormControl( "", [Validators.minLength(10)]),
  });

  responseStatus: string = '';

  constructor(    
      private MedicineService: MedicineServiceService,
      private CategoryTypeService: CategoryTypeServiceService
    ) { }

  ngOnInit(): void {
    this.types = this.CategoryTypeService.getTypes();
    this.CategoryTypeService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  goBack(){
    history.back();
  }

  bindForm(){
    this.medicine.medicineId = '00000000-0000-0000-0000-000000000000';
    this.medicine.name = this.addProductForm.value.name.trim();
    this.medicine.brandName = this.addProductForm.value.brandName.trim();
    this.medicine.chemical = this.addProductForm.value.chemical.trim();
    this.medicine.qty = this.addProductForm.value.qty;
    this.medicine.power = this.addProductForm.value.power.trim();
    this.medicine.category = this.addProductForm.value.category;
    this.medicine.url = this.addProductForm.value.url.split('\\')[2];
    this.medicine.type = this.addProductForm.value.type;
    this.medicine.exp = `${this.addProductForm.value.expMonth}/${this.addProductForm.value.expYear}`;
    this.medicine.mfg = `${this.addProductForm.value.mfgMonth}/${this.addProductForm.value.mfgYear}`;
    this.medicine.price = this.addProductForm.value.price;
    this.medicine.seller = this.addProductForm.value.seller.trim();
    this.medicine.description = this.addProductForm.value.description.trim();
    this.categories.forEach(category => {
      if(category.urlName === this.addProductForm.value.category){
        this.medicine.categoryName = category.categoryName;
      }
    });
  }


  createProduct(){
    this.bindForm();

    this.MedicineService.addMedicine(this.medicine).subscribe({
      next: (response) => {
        console.log(response);
        this.responseStatus = 'ok';
        setTimeout(() => {
          history.back();
        }, 3000)
      },
      error: (response) => {
        if(response.status > 400 && response.status < 500){
          this.responseStatus = 'error';
          setTimeout(() => {
            history.back();
          }, 3000)
        }
      }
    })
  }
}
