import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  public currentRole: string|null
  public profilename:string
  public username:string
  public lastname :string
  public email:string
  public userid:number;
  public profilepicture:string

  constructor(  public adminService: AdminService
    ){
  
    const userData:any = localStorage.getItem('currentUser')
    this.currentRole= JSON.parse(userData).role
    this.userid=JSON.parse(userData).id
    this.profilename=JSON.parse(userData).firstname
    this.username=JSON.parse(userData).username
    this.lastname=JSON.parse(userData).lastname
    this.email=JSON.parse(userData).email
    this.profilepicture=JSON.parse(userData).profilepicture==undefined?"":JSON.parse(userData).profilepicture

  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.adminService.uploadProfile(file.name,this.userid).subscribe(()=>{
   
    });
    this.adminService.getUsers().subscribe((values)=>{
      const data :any = values
      for(var i=0; i<data.length;i++)
      if(data[i]["id"]==this.userid)
      this.profilepicture=data[i]["profilepicture"]
    })
  }
}
