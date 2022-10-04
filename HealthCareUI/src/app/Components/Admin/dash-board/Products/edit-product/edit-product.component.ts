import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/Models/CategoryModel';
import { Medicine } from 'src/app/Models/MedicideModel';
import { MedicineType } from 'src/app/Models/TypesModel';
import { CategoryTypeServiceService } from 'src/app/Services/category-type-service.service';
import { MedicineServiceService } from 'src/app/Services/medicine-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
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
    dateCreated: '',
    dateUpdated: '',
    category: '',
    categoryName: '',
  };

  monthArr : any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  yearArr : any[] = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

  paramId : number = 0;

  addProductForm: FormGroup;

  constructor(
    private MedicineService: MedicineServiceService,
    private CategoryTypeService: CategoryTypeServiceService, 
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramId = this.router.snapshot.params['id'];
    this.types = this.CategoryTypeService.getTypes();
    this.categories = this.CategoryTypeService.getCategories();
    
    this.medicine = this.MedicineService.getMedicine(this.paramId);

    this.addProductForm = new FormGroup({
      medicineId: new FormControl('this.medicine.medicineId'),
      medicineName: new FormControl(this.medicine.name, [Validators.required,Validators.minLength(3)]),
      chemicalName: new FormControl(this.medicine.chemical, [Validators.required,Validators.minLength(3)]),
      brandName: new FormControl(this.medicine.brandName, [Validators.required,Validators.minLength(3)]),
      quantity: new FormControl(this.medicine.qty, [Validators.required, Validators.min(1), Validators.max(100)]),
      power: new FormControl(this.medicine.power, [Validators.required]),
      photo: new FormControl('', [Validators.required]),
      category: new FormControl(this.medicine.category, [Validators.required]),
      type: new FormControl(this.medicine.type, [Validators.required]),
      expMonth: new FormControl(parseInt(this.medicine.exp.split('/')[0]) ,[Validators.required]),
      expYear: new FormControl(parseInt(this.medicine.exp.split('/')[1]) ,[Validators.required]),
      mfgMonth: new FormControl(parseInt(this.medicine.mfg.split('/')[0]) ,[Validators.required]),
      mfgYear: new FormControl(parseInt(this.medicine.mfg.split('/')[1]) ,[Validators.required]),
      price: new FormControl(this.medicine.price, [Validators.required, Validators.pattern('^[1-9]d{0,7}(?:.d{1,4})?|.d{1,4}$')]),
      sellerName: new FormControl(this.medicine.seller, [ Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.medicine.description, [Validators.minLength(10)]),
    });

    if(this.categories[0].urlName === 'all' && this.types[0].name){
      this.categories.shift();
      this.categories.shift();
    }
  }

  editProduct() {
    this.medicine = this.addProductForm.value;
    this.medicine.url = this.addProductForm.value.photo.split('\\')[2];
    this.medicine.exp = `${this.addProductForm.value.expMonth}/${this.addProductForm.value.expYear}`;
    this.medicine.mfg = `${this.addProductForm.value.mfgMonth}/${this.addProductForm.value.mfgYear}`;
    console.log(this.medicine);
  }
}
