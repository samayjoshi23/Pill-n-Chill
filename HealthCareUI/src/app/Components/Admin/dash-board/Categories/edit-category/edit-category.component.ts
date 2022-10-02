import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  addCategoryForm : FormGroup = new FormGroup({
    catName: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

  editCategory(){
    console.log(this.addCategoryForm);
  }

}
