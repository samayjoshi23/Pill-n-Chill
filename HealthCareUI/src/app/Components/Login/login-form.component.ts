import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Models/LoginModel';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  login: Login = {
    email: '',
    password: ''
  }

  credentialValidity: string = '';
  credentialValidityMsg: string = '';


  loginForm : FormGroup = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])  
  });

  constructor(private AuthService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  submitLogin(){
    this.login = this.loginForm.value;
    this.AuthService.login(this.login).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('uid', response.userId);
        localStorage.setItem('role', response.role);
        localStorage.setItem('uName', response.firstName);
        if(response.role == 'admin'){
          this.router.navigate(['/admin/dashboard']);
        }
        else{
          this.router.navigate(['/']);
        }
      },
      error: (response) => {
        this.credentialValidity = 'invalid';
        if(response.status === 400){
          this.credentialValidityMsg = 'Invalid Credentials... Recheck Email and Password';
          this.loginForm.value.email = '';
          this.loginForm.value.password = '';
        }
        setTimeout(()=> {
          this.credentialValidity = 'invalid hide';
        }, 3000)
      }
    });
  }
}
