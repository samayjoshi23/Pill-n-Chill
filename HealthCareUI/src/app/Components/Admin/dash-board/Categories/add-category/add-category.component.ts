import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/Models/CategoryModel';
import { CategoryTypeServiceService } from 'src/app/Services/category-type-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  roleMessage: string = '';
  roleStatus: string = '';

  newCategory: Category = {
    categoryId: 0,
    urlName: '',
    categoryName: '',
    url: '',
  }

  addCategoryForm : FormGroup = new FormGroup({
    categoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    urlName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    url: new FormControl('', [Validators.required, Validators.minLength(3)]),
    // photo: new FormControl('', [Validators.required])
  });

  constructor(private categoryService: CategoryTypeServiceService) { }

  ngOnInit(): void {
  }

  responseStatus(message: string, status: string){
    this.roleMessage = message;
    this.roleStatus = status;
    
    setTimeout(() => {
      this.roleMessage = '';
      this.roleStatus = '';
    }, 3000);

    history.back();
  }

  addCategory(){

    this.newCategory = this.addCategoryForm.value;
    this.newCategory.categoryId = Math.floor(Math.random()*1000000);

    this.categoryService.addCategory(this.addCategoryForm.value).subscribe({
      next: () => {
        this.responseStatus("Category Added Successfully...", 'success');
      },
      error: () => {
        this.responseStatus("Unable to Add, Server Error", 'error');
      }
    });
  }

}
