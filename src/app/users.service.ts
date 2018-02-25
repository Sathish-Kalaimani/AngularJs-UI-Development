import { Injectable } from '@angular/core';
import {Users} from './users/users';
import {Http} from '@angular/http';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  private USER_SERVICE_BASE_URL = 'http://localhost:8084/api/user';

  private CREATEUSER = 'http://localhost:8082/user';
  private AUTHENTICATE = 'http://localhost:8082/login';
  headerObj = new Headers({
    'Authorization': 'Bearer ' + localStorage.getItem('tocken')
  });

  getUsers() {
    return this.http.get(this.USER_SERVICE_BASE_URL);
  }

  registerUser(form) {
    return this.http.post(this.CREATEUSER, form.value);
  }

  authenticateUser(form) {
    return this.http.post(this.AUTHENTICATE, form.value);
  }
}
