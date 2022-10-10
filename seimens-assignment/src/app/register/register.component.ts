import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  user!: User;
  dataList: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      address: new FormGroup({
        city: new FormControl('Bangalore', Validators.required),
        state: new FormControl('Karnataka', Validators.required),
        pincode: new FormControl('560001', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
      })
    });
    this.getAllUsers();
  }

  onSubmit() {
    this.user = this.registerForm.value;
    this.userService.createUser(this.user).subscribe(data => {
      this.dataList.push(data);
      console.log(data);
    })
    this.registerForm.get('username')?.reset();
    this.registerForm.get('email')?.reset();
  };

  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.dataList = data;
    })
  }

  getUserDetails() {
    let user = this.registerForm.value.username;
    console.log(user);
    this.userService.getUser(user).subscribe(data => {
      console.log(data);
    })
  };

}
