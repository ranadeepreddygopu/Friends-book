export interface IUserDetails {
    firstname:String;
    lastname:String;
    email: String;
    username?:string;
    password: String;
    address: String;
    city: String;
    state: String;
    zip: String;
    id?: number;
    role?:string;
  }
