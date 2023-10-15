import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUserDetails } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent {
  public userRecords: IUserDetails[];
  userdata:any
  constructor(public adminService:AdminService){
    this.userRecords=[]
    this.userdata=[]
  }
  public ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.adminService.getUsers().subscribe((response: any) => {
      for(var i=0;i< response.length;i++){
        var keys=Object.keys(response[i])
        var temp = keys.includes("Requests")
        if(!keys.includes("Requests")){
          this.userRecords = response;
          this.userdata = localStorage.getItem('currentUser')
          var id = JSON.parse(this.userdata).id
          this.userRecords= this.userRecords.filter(item=>item["id"]!=id)
        }
        else{
          this.userRecords=[]
        }
    }
    });
  }
  sendrequest(id:any){
    this.adminService.connectfriends({"Requests":{"status":"pending","friend":JSON.parse(this.userdata).id}},id).subscribe((respondr:any)=>{

    })
    this.loadUsers()
  }

}
