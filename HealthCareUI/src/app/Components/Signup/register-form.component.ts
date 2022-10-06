import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/Models/RegisterModel';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  register: Register = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: 0,
    phone: 0,
  }

  registerForm : FormGroup = new FormGroup({
    firstName : new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+[A-Za-z ]*$/)]),  
    lastName : new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+[A-Za-z ]*$/)]),  
    email : new FormControl('', [Validators.required, Validators.email]),  
    password : new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),  
    age : new FormControl('', [Validators.required, Validators.pattern("^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$")]),  
    phone : new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])  
  });


  constructor(private AuthService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  submitRegister(){
    console.log(this.registerForm.value);
    this.register = this.registerForm.value;
    this.AuthService.register(this.register).subscribe({
      next: (response) => {
        console.log(response.token);
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/']);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

}
