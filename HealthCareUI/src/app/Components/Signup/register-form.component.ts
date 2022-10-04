import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm : FormGroup = new FormGroup({
    fName : new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+[A-Za-z ]*$/)]),  
    lName : new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+[A-Za-z ]*$/)]),  
    email : new FormControl('', [Validators.required, Validators.email]),  
    password : new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),  
    age : new FormControl('', [Validators.required, Validators.pattern("^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$")]),  
    phone : new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])  
  });
  constructor() { }

  ngOnInit(): void {
  }

  submitRegister(){
    console.log(this.registerForm);
  }

}
