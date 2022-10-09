import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/Models/CategoryModel';
import { CategoryTypeServiceService } from 'src/app/Services/category-type-service.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  addCategoryForm: FormGroup = new FormGroup({
    categoryId: new FormControl(0),
    categoryName: new FormControl(''),
    urlName: new FormControl(''),
    url: new FormControl(''),
    // photo: new FormControl('', [Validators.required])
  });

  paramId: number = 0;
  roleMessage: string = '';
  roleStatus: string = '';

  constructor(
    private CategoryTypeService: CategoryTypeServiceService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramId = parseInt(this.router.snapshot.params['id']);
    this.CategoryTypeService.getOneCategory(this.paramId).subscribe({
      next: (result) => {
        this.addCategoryForm = new FormGroup({
          categoryId: new FormControl(result.categoryId),
          categoryName: new FormControl(result.categoryName, [Validators.required,Validators.minLength(3)]),
          urlName: new FormControl(result.urlName, [Validators.required,Validators.minLength(3)]),
          url: new FormControl(result.url, [Validators.required,Validators.minLength(3)]),
          // photo: new FormControl('', [Validators.required])
        });
      },
      error: () => {
        this.responseStatus("Can't load categories. Contact DBA", 'error');
      },
    });
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

  editCategory() {
    this.CategoryTypeService.updateCategory(this.addCategoryForm.value.categoryId, this.addCategoryForm.value).subscribe({
      next: () => {
        this.responseStatus("Category Updated Successfully...", 'success');
      },
      error: () => {
        this.responseStatus("Unable to Update, Server Error", 'error');
      }
    })
  }
}