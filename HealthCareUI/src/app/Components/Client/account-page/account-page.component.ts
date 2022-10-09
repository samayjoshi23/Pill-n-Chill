import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  user : any = {}
  UpdateFrom: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(0)
  })
  
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    let id = localStorage.getItem('uid');
    this.userService.getUser(id).subscribe({
      next: (result) => {
        this.user = result;
        this.UpdateFrom = new FormGroup({
          firstName: new FormControl(result.firstName, [Validators.required, Validators.minLength(2)]),
          lastName: new FormControl(result.lastName, [Validators.required, Validators.minLength(3)]),
          phone: new FormControl(result.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
        })
        console.log(this.user);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }


  updateUser(){
    this.user.firstName = this.UpdateFrom.value.firstName;
    this.user.lastName = this.UpdateFrom.value.lastName;
    this.user.phone = this.UpdateFrom.value.phone;

    console.log(this.user);

    this.userService.updateUserDetails(this.user.userId, this.user).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
