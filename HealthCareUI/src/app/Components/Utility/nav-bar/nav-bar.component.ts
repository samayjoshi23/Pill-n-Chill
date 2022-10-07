import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ROUTER_CONFIGURATION } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public auth: AuthServiceService, private router: Router) { }

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
  
  logout(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

}
