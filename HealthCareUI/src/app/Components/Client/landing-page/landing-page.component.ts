import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/CategoryModel';
import { Medicine } from 'src/app/Models/MedicideModel';
import { CategoryTypeServiceService } from 'src/app/Services/category-type-service.service';
import { MedicineServiceService } from 'src/app/Services/medicine-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  categories: Category[] = [];
  topProducts: Medicine[] = [];


  constructor(private CategoryService: CategoryTypeServiceService, private MedicineService: MedicineServiceService) { }

  ngOnInit(): void {
    
    this.categories = this.CategoryService.getCategories();

    this.MedicineService.getTop6().subscribe({
      next: (result) => {
        this.topProducts = result;
      },
      error: (response) => {
        console.log(response);
      }
    })

    
    if(this.categories[0].urlName === 'all'){
      this.categories.shift();
    }
  }

}
