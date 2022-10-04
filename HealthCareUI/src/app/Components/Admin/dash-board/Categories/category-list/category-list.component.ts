import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/CategoryModel';
import { CategoryTypeServiceService } from 'src/app/Services/category-type-service.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private CategoryTypeService: CategoryTypeServiceService) { }

  ngOnInit(): void {
    this.categories = this.CategoryTypeService.getCategories();

    if(this.categories[0].urlName == 'all'){
      this.categories.shift();
    }
  }

  removeCategory(id: number){
    console.log(id);
  }
}
