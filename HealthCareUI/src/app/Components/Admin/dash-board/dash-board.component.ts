import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  userId: string = localStorage.getItem('uid');
  isAdmin: boolean = false;
  timer: number = 15;

  constructor(private UserService: UserService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.userId);
    this.UserService.getUser(this.userId).subscribe({
      next: (result) => {
        console.log(result)
        console.log(result.role);
        if (result.role !== 'admin') {
          this.isAdmin == false;
          this.startTimer();
        }
        else{
          this.isAdmin = true;
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  startTimer() {
    setInterval(() => {
      if(this.timer > 0) {
        this.timer--;
      } else {
        this.router.navigate(['/']);
      }
    },1000)
  }
}
