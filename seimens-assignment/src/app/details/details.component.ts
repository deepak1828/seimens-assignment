import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  userList: any = [];

  ngOnInit() {
    this.getAllUsers();
  }

  dataList: any;
  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.dataList = data;
      
      this.dataList.map((val:any) => {
        let user = {
          id: val.id,
          username: val.username,
          email: val.email,
          fullAddress: val.address.city + ', ' + val.address.state + ', ' + val.address.pincode
        }
        this.userList.push(user);
      })
      console.log(this.userList);
    })
  };

  removeUser(user:any) {
    console.log(user);
    this.userList = [];
    this.userService.removeUser(user).subscribe(() => {
      this.getAllUsers();``
    })
  }

}
