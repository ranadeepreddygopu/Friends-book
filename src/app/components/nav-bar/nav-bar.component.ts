import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  public currentRole: string|null
  constructor(){
  
    const userData:any = localStorage.getItem('currentUser')
    this.currentRole= JSON.parse(userData).role
   
  }
}
