import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserDetails } from 'src/app/models/user.model';
// import { MustMatchDirective } from '../../directives/must-match.directive';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  public currentRole: string | null
  public profilename: string
  public username: string
  public lastname: string
  public email: string
  public userid: number;
  public profilepicture: string
  public userRecords: IUserDetails[];
  public userForm: FormGroup;
  public userDetails: IUserDetails;
  public isUserFormSubmitted: boolean;
  public editcheck:boolean
  public responsedata:any
  public changepasswordcheck:boolean
  public passmatch:boolean
  constructor(public adminService: AdminService, public formBuilder: FormBuilder

  ) {

    const userData: any = localStorage.getItem('currentUser')
    this.currentRole = JSON.parse(userData).role
    this.userid = JSON.parse(userData).id
    this.profilename = JSON.parse(userData).firstname
    this.username = JSON.parse(userData).username
    this.lastname = JSON.parse(userData).lastname
    this.email = JSON.parse(userData).email
    this.profilepicture = JSON.parse(userData).profilepicture == undefined ? "" : JSON.parse(userData).profilepicture
    this.userRecords = [];
    this.userForm = {} as FormGroup;
    this.userDetails = {} as IUserDetails;
    this.isUserFormSubmitted=false
    this.editcheck=false
    this.responsedata=[]
    this.changepasswordcheck=false
    this.passmatch=false
  }
  
  public ngOnInit(): void {
    this.loadUsers();
    this.initializeForm();
  }
  get userFormControls(){
    return this.userForm.controls; 
  }
  public initializeForm(){
    this.userForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      username: ['',[Validators.required]],
      firstname: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6)],],
      confirmpassword:['',[Validators.required,Validators.minLength(6),]]

    });
  }
  public loadUsers() {
    this.adminService.getUsers().subscribe((response: any) => {
      this.userRecords = response;
      this.userRecords = this.userRecords.filter(item => item["id"] == this.userid)
      this.userForm.patchValue({...this.userRecords[0]});

    });
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.adminService.uploadProfile(file.name, this.userid).subscribe(() => {

    });
    this.adminService.getUsers().subscribe((values) => {
      const data: any = values
      for (var i = 0; i < data.length; i++)
        if (data[i]["id"] == this.userid)
          this.profilepicture = data[i]["profilepicture"]
    })
  }
  edit(){
    this.editcheck =true
    this.changepasswordcheck=false
  }
  changepassword(){
    this.changepasswordcheck=true
    this.editcheck =true
    this.userForm.patchValue({"password":'',"confirmpassword":""});

  }
  public onSubmit() {
   
    this.isUserFormSubmitted = true;
    var tempdata = this.userForm.getRawValue()
    if(tempdata['password']==tempdata['confirmpassword']){
      this.passmatch=false
    if (this.userForm.valid) {
    delete tempdata["confirmpassword"]
    this.adminService.updatepassword(tempdata,this.userid).subscribe((response: any)=>{
    this.responsedata = response
    this.email=this.responsedata["email"]
    this.profilename =this.responsedata["firstname"]
    this.lastname=this.responsedata["lastname"]
    this.username=this.responsedata["username"]
    this.editcheck =false
    });
    
  }
}
else{
  this.passmatch=true
}
  }
  close(){
    this.editcheck =false

  }
}
