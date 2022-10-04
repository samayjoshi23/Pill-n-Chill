import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/Models/CategoryModel';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category = {
    categoryId: 108,
    urlName: '',
	  categoryName: '',
    url: ''
  }


  addCategoryForm : FormGroup = new FormGroup({
    categoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    urlName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    url: new FormControl('', [Validators.required, Validators.minLength(3)]),
    // photo: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

  addCategory(){
    console.log(this.addCategoryForm);
  }

}
