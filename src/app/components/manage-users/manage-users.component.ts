import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUserDetails } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  public userRecords: IUserDetails[];
  public userForm: FormGroup;
  public userDetails: IUserDetails;
  public isUserFormSubmitted: boolean;
  public closeResult: string;
  public actionSelected:string;
  public userSelectedId:any;

  constructor(
    public adminService: AdminService,
    public modalService: NgbModal,
    public formBuilder:FormBuilder
  ) {
    this.userRecords = [];
    this.userForm = {} as FormGroup;
    this.userDetails = {} as IUserDetails;
    this.isUserFormSubmitted = false;
    this.closeResult = '';
    this.actionSelected = '';
    this.userSelectedId = 0;
  }

  public ngOnInit(): void {
    this.loadUsers();
    this.initializeForm();
  }

  public initializeForm(){
    this.userForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]],
      address: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
      city: ['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      state: ['',[Validators.required]],
      role: ['',[Validators.required]],
      zip: [''],
    });
  }

  public loadUsers() {
    this.adminService.getUsers().subscribe((response: any) => {
      this.userRecords = response;
    });
  }

  public addUser(content: any) {
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  public editUser(content: any,userData:IUserDetails) {
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
       
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
    this.userForm.patchValue({...userData});
    this.userSelectedId = userData.id;
    this.actionSelected = 'edit';

  }

  public deleteConfirmUser(content:any,userData:IUserDetails){
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  this.userSelectedId = userData.id
   
  }

  public deleteUser() {
    this.adminService.deleteUser(this.userSelectedId).subscribe((data:IUserDetails)=>{
      this.modalService.dismissAll();
      this.loadUsers();
     this.actionSelected = '';
     this.userSelectedId = '';
    
     this.userForm.reset();
     this.userForm.updateValueAndValidity();
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  get userFormControls(){
    return this.userForm.controls; 
  }

  public onSubmit() {
    this.isUserFormSubmitted = true;
    this.isUserFormSubmitted = true;
   
    if( this.actionSelected  ==='edit'){
      this.adminService.updateUser( this.userForm.getRawValue(),this.userSelectedId).subscribe((val:IUserDetails)=>{
        this.modalService.dismissAll();
        this.loadUsers();
       this.actionSelected = '';
       this.userSelectedId = '';
       this.userForm.reset();
       this.userForm.updateValueAndValidity();
      })
    }else{
      if(this.userForm.status === 'VALID'){
        this.userDetails = this.userForm.getRawValue();
        this.adminService.AddUser( this.userDetails).subscribe((val:IUserDetails)=>{
         this.modalService.dismissAll();
         this.loadUsers();
        this.actionSelected = '';
        this.userSelectedId = '';
        this.userForm.reset();
        this.userForm.updateValueAndValidity();
       })
      
     }
    }
  }
}
