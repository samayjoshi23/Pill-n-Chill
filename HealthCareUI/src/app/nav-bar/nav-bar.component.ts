import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  navChange : boolean = false;
  nav = document.querySelector('#nav') as HTMLDivElement;

  ngOnInit(): void {
  }
  @HostListener("document:scroll")
  scrollFunction(){
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
      this.navChange = true;
    }
    else
      this.navChange = false;
  }

}
