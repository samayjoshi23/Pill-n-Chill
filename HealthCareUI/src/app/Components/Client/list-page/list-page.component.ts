import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/Models/MedicideModel';
import { MedicineServiceService } from 'src/app/Services/medicine-service.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  medicineList: Medicine[] = [];

  constructor(private MedicineService : MedicineServiceService) { }

  ngOnInit(): void {
    this.medicineList = this.MedicineService.getMedicineList();
  }
}
