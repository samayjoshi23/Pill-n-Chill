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

  paramId : number = 0;
  quantity: number = 1;

  constructor(private MedicineService: MedicineServiceService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramId = this.router.snapshot.params['id'].toString();
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
    if (this.quantity === 15 || this.quantity === this.medicine.qty) {
      return;
    }
    this.quantity++;
  }
  decreaseCount() {
    if (this.quantity === 1) {
      return;
    }
    this.quantity--;
  }
}
