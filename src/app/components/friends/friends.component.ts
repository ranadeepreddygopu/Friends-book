import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUserDetails } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
public userRecords: IUserDetails[];
userdata:any
constructor(public adminService:AdminService){
  this.userRecords=[]
}
public ngOnInit(): void {
  this.loadUsers();
}
loadUsers(){
  this.adminService.getUsers().subscribe((response: any) => {
    this.userdata = localStorage.getItem('currentUser')
    var id = JSON.parse(this.userdata).id
    for(var i=0;i< response.length;i++){
      var jsonobj:any={}
      var keys=Object.keys(response[i])
      if(keys.includes("Requests")){
      for(var j=0;j<response[i]["Requests"].length;j++){
      if(response[i]["Requests"][j]["status"]=="pending" && response[i]["Requests"][j]["friend"]!=id){
        jsonobj = response[i];
      }
    }
    }
      this.userRecords.push(jsonobj)

  }
  this.userdata = localStorage.getItem('currentUser')
  var id = JSON.parse(this.userdata).id
  this.userRecords= this.userRecords.filter(item=>item["id"]!=id)
  this.userRecords= this.userRecords.filter(item=>Object.keys(item).length>0)
  });
}

acceptrequest(id:any){
  this.adminService.connectfriends({"Requests":[{"status":"accepted","friend":JSON.parse(this.userdata).id}]},id).subscribe((respondr:any)=>{
    alert('Frind request sent')
  })
  this.loadUsers()

}
}
