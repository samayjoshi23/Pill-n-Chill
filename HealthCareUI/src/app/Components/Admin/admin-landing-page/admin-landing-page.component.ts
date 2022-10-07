import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-landing-page',
  templateUrl: './admin-landing-page.component.html',
  styleUrls: ['./admin-landing-page.component.css']
})
export class AdminLandingPageComponent implements OnInit {

  
  userName: string = '';
  
  constructor() { }

  ngOnInit(): void { 
    this.userName = localStorage.getItem('uName').toUpperCase();
  }

}
