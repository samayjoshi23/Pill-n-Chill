import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userList: any = [];
  roleList: any = [
    {
      name: 'User',
      value: 'user',
    },
    {
      name: 'Admin',
      value: 'admin',
    },
  ];

  roleMessage: string = '';
  roleStatus: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.userList = users;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  responseStatus(message: string, status: string){
    this.roleMessage = message;
    this.roleStatus = status;
    
    setTimeout(() => {
      this.roleMessage = '';
      this.roleStatus = '';
    }, 5000);
  }

  updateRole(id: string, userName: string) {
    let selector = document.querySelector(`#role${id}`) as HTMLSelectElement;
    let newRole = selector.value;

    if (localStorage.getItem('uid') === id) {
      this.responseStatus("Admin can't change their own role. Ask another Admin.", "error");
      return;
    } 
    else
    {
      this.userService.changeUserRole(id, newRole).subscribe({
        next: (response) => {
          this.responseStatus(`Success fully changed the role of ${userName} to ${newRole}`, "success");
        },
        error: (response) => {
          this.responseStatus(`Something went wrong, server error.`, "error");
        },
      });
    }
  }
}
