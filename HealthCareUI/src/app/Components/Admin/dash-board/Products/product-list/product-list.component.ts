import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/Models/MedicideModel';
import { MedicineServiceService } from 'src/app/Services/medicine-service.service';
import { Category } from 'src/app/Models/CategoryModel';
import { MedicineType } from 'src/app/Models/TypesModel';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  medicineList: Medicine[] = [];
  types: MedicineType[] = [];
  categories: Category[] = [];
  constructor(private MedicineService: MedicineServiceService) { }

  ngOnInit(): void {
    this.MedicineService.getAllMedicines().subscribe({
      next: (response) => {
        this.medicineList = response;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
  
  removeMedicine(id : string){
    this.MedicineService.removeMedicine(id).subscribe({
      next: (response) => {
        console.log(response);
        this.ngOnInit();
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
