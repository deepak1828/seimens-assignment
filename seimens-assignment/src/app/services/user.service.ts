import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  baseUrl = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  createUser(user:User) {
    return this.http.post<User>(this.baseUrl, user);
  }

  getAllUsers(): Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getUser(user:User) {
    let users = this.http.get(this.baseUrl);
    console.log(users);
    return users;
  }

  removeUser(user:User) {
    return this.http.delete(this.baseUrl + user.id);
  }
}
