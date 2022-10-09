import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicine } from 'src/app/Models/MedicideModel';
import { MedicineServiceService } from 'src/app/Services/medicine-service.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
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

  paramId : string = '';
  medQty: number = 1;

  constructor(
    private MedicineService: MedicineServiceService,
    private ActRouter: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.paramId = this.ActRouter.snapshot.params['id'].toString();

    this.MedicineService.getMedicine(this.paramId).subscribe({
      next: (result) => {
        this.medicine = result;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  increaseCount() {
    if (this.medQty === 15 || this.medQty === this.medicine.qty) {
      return;
    }
    this.medQty++;
  }
  decreaseCount() {
    if (this.medQty === 1) {
      return;
    }
    this.medQty--;
  }

  gotoCheckout(){
    let productData = {
      medicineId: this.medicine.medicineId,
      name: this.medicine.name,
      qty: this.medQty,
      price: this.medicine.price
    }

    localStorage.setItem("productData", JSON.stringify(productData));

    this.router.navigate([`/products/checkout/${this.medicine.medicineId}`]);
  }

}
