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
  addCategoryForm: FormGroup;
  category: Category = {
    categoryId: 108,
    urlName: '',
	  categoryName: '',
    url: ''
  }
  paramId:number = 0;


  constructor(private CategoryTypeService: CategoryTypeServiceService, private router: ActivatedRoute) {}

  ngOnInit(): void {

    this.paramId = parseInt(this.router.snapshot.params['id']);
    this.category = this.CategoryTypeService.getOneCategory(this.paramId);

    this.addCategoryForm = new FormGroup({
      categoryId: new FormControl(this.category.categoryId),
      categoryName: new FormControl(this.category.categoryName, [Validators.required,Validators.minLength(3)]),
      urlName: new FormControl(this.category.urlName, [Validators.required,Validators.minLength(3)]),
      url: new FormControl(this.category.url, [Validators.required, Validators.minLength(3)]),
      // photo: new FormControl('', [Validators.required])
    });
  }

  editCategory() {
    this.category = this.addCategoryForm.value;
    console.log(this.category);
  }
}
