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
  public userdata1:IUserDetails[]
  public tempdata:any
  userdata:any
  constructor(public adminService:AdminService){
    this.userRecords=[]
    this.userdata=[]
    this.userdata1=[]
    this.tempdata=[]
  }
  public ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userdata = localStorage.getItem('currentUser')
    var id = JSON.parse(this.userdata).id
    this.adminService.getUsers().subscribe((response: any) => {
      for(var i=0;i<response.length;i++){
        var jsonobj:any={}
        var keys=Object.keys(response[i])
        if(!keys.includes("Requests")){
          jsonobj = response[i];
        }
        if(keys.includes("Requests")){
          for(var j=0;j<response[i]["Requests"].length;j++){
               if(response[i]["Requests"][j]["status"]=="pending" && response[i]["Requests"][j]["friend"]!=id){
                jsonobj=response[i]
               }
          }
        }
        else{
          this.userdata1.push(response[i])
        }
        this.userRecords.push(jsonobj)

    }
    this.userRecords= this.userRecords.filter(item=>item["id"]!=id)
    this.userRecords= this.userRecords.filter(item=>Object.keys(item).length>0)

    });
  }
  sendrequest(id:any){
    var requestsdata:any;
    requestsdata = this.userdata1.filter((item: { [x: string]: any; })=>item["id"]==id)
    if(Object.keys(requestsdata).includes("Requests")){
     for(var i=0;i< requestsdata["Requests"].length;i++){
       this.tempdata.push(requestsdata["Requests"][i])
     }
     this.tempdata.push({"status":"pending","friend":JSON.parse(this.userdata).id})
    }
    else{
      this.tempdata =[{"status":"pending","friend":JSON.parse(this.userdata).id}]
    }
    
    this.adminService.connectfriends({"Requests":this.tempdata},id).subscribe((respondr:any)=>{
      alert('Frind request sent')
    })
    this.userRecords=[]
    this.loadUsers()
  }

}
