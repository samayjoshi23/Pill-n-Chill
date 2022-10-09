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
  roleMessage: string = '';
  roleStatus: string = '';

  constructor(private CategoryTypeService: CategoryTypeServiceService) { }

  ngOnInit(): void {
    this.CategoryTypeService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  responseStatus(message: string, status: string){
    this.roleMessage = message;
    this.roleStatus = status;
    
    setTimeout(() => {
      this.roleMessage = '';
      this.roleStatus = '';
    }, 3000);
  }

  removeCategory(id: number){
    this.CategoryTypeService.removeCategory(id).subscribe({
      next: () => {
        this.responseStatus("Category removed", 'success');
        this.ngOnInit();
      },
      error: () => {
        this.responseStatus("Unable to Remove, Server Error", 'error');
      }
    });
  }
}
