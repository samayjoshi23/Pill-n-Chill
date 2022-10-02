import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  addCategoryForm : FormGroup = new FormGroup({
    catName: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

  addCategory(){
    console.log(this.addCategoryForm);
  }

}
