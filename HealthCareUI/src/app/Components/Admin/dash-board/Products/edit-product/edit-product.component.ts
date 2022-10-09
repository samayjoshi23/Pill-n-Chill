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

  monthArr: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  yearArr: any[] = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

  paramId: string = '';

  addProductForm: FormGroup = new FormGroup({
    medicineId: new FormControl(),
    name: new FormControl(''),
    chemical: new FormControl(''),
    brandName: new FormControl(''),
    qty: new FormControl(''),
    power: new FormControl(''),
    url: new FormControl(''),
    category: new FormControl(''),
    type: new FormControl(''),
    expMonth: new FormControl(''),
    expYear: new FormControl(''),
    mfgMonth: new FormControl(''),
    mfgYear: new FormControl(''),
    price: new FormControl(''),
    seller: new FormControl(''),
    description: new FormControl(''),
  });

  responseStatus: string = '';

  constructor(
    private MedicineService: MedicineServiceService,
    private CategoryTypeService: CategoryTypeServiceService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramId = this.router.snapshot.params['id'].toString();

    this.types = this.CategoryTypeService.getTypes();
    
    this.CategoryTypeService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (response) => {
        console.log(response);
      }
    });

    this.MedicineService.getMedicine(this.paramId).subscribe({
      next: (result) => {
        this.medicine = result;
        console.log(result);
        this.bindForm();
      },
      error: (response) => {
        console.log(response);
      },
    });

  }

  bindForm() {
    this.addProductForm = new FormGroup({
      medicineId: new FormControl(this.medicine.medicineId),
      name: new FormControl(this.medicine.name, [Validators.required,Validators.minLength(3)]),
      chemical: new FormControl(this.medicine.chemical, [Validators.required,Validators.minLength(3)]),
      brandName: new FormControl(this.medicine.brandName, [Validators.required,Validators.minLength(3)]),
      qty: new FormControl(this.medicine.qty, [Validators.required,Validators.min(1),Validators.max(100)]),
      power: new FormControl(this.medicine.power, [Validators.required]),
      url: new FormControl('', [Validators.required]),
      category: new FormControl(this.medicine.category, [Validators.required]),
      type: new FormControl(this.medicine.type, [Validators.required]),
      expMonth: new FormControl(parseInt(this.medicine.exp.split('/')[0]), [Validators.required]),
      expYear: new FormControl(parseInt(this.medicine.exp.split('/')[1]), [Validators.required]),
      mfgMonth: new FormControl(parseInt(this.medicine.mfg.split('/')[0]), [Validators.required]),
      mfgYear: new FormControl(parseInt(this.medicine.mfg.split('/')[1]), [Validators.required]),
      price: new FormControl(this.medicine.price, [Validators.required,Validators.pattern('^[1-9]d{0,7}(?:.d{1,4})?|.d{1,4}$')]),
      seller: new FormControl(this.medicine.seller, [Validators.required,Validators.minLength(3)]),
      description: new FormControl(this.medicine.description, [Validators.minLength(15)]),
    });
  }

  dataBinding(){
    this.medicine.name = this.addProductForm.value.name.trim();
    this.medicine.brandName = this.addProductForm.value.brandName.trim();
    this.medicine.chemical = this.addProductForm.value.chemical.trim();
    this.medicine.qty = this.addProductForm.value.qty;
    this.medicine.power = this.addProductForm.value.power;
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

  goBack(){
    history.back();
  }


  editProduct() {
    this.dataBinding();

    this.MedicineService.updateMedicine(this.medicine.medicineId, this.medicine).subscribe({
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
