import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  public currentRole: string|null
  public profilename:string
  constructor(){
  
    const userData:any = localStorage.getItem('currentUser')
    this.currentRole= JSON.parse(userData).role
    
    this.profilename=JSON.parse(userData).firstname
  }
  
}
