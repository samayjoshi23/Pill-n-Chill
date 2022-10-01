import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm : FormGroup = new FormGroup({
    fName : new FormControl('', [Validators.required, Validators.minLength(3)]),  
    lName : new FormControl('', [Validators.required, Validators.minLength(3)]),  
    email : new FormControl('', [Validators.required, Validators.email]),  
    password : new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),  
    age : new FormControl('', [Validators.required]),  
    phone : new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])  
  });
  constructor() { }

  ngOnInit(): void {
  }

  submitRegister(){
    console.log(this.registerForm);
  }

}
