import { Injectable } from '@angular/core';
import {Users} from '../users/users';
import {Http, Headers} from '@angular/http';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  private USER_SERVICE_BASE_URL = 'http://localhost:8082/api/user';

  private CREATEUSER = 'http://localhost:8082/registration';
  private AUTHENTICATE = 'http://localhost:8082/login';

  headerObj = new Headers ({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

    register(form) {
    return this.http.post(this.CREATEUSER, form.value);
  }

  getUser(uname){
    return this.http.get('http://localhost:8082/'+uname);
  }

  authenticateUser(form) {
    return this.http.post(this.AUTHENTICATE, form.value);
  }

  getUsers() {
    return this.http.get(this.USER_SERVICE_BASE_URL, {headers: this.headerObj});
  }

  passwordReset(username,payload){
    return this.http.post('http://localhost:8082/reset/'+username,payload);
  }

}
