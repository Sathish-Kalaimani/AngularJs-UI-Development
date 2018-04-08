import { UsersService } from '../services/users.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userservice: UsersService, private router: Router) { }
  error: string;
  logform(form: NgForm) {
    console.log(form.value);
    this.userservice.authenticateUser(form).subscribe(data => {
      if (data.status === 200) {
        this.router.navigate(['/dashboard']);
        this.error = '';
        location.reload();
        localStorage.setItem('token', data.json().token);
        localStorage.setItem('username', form.value.username);
      }
    },
      error => {
        if (error.status !== 200) {
          this.error = "Invalid Credentials";
        }

      });
  }

  match(password,confirm_password){
    console.log(password+' '+confirm_password);
    if(password===confirm_password){
      this.error='';
     
    }else{
      this.error = "Password Doesn't Match";
      password='';
      confirm_password='';
    }
  }

  openModal(id) {
    document.getElementById(id).style.display = 'block';
  }
  closeModal(id) {
    document.getElementById(id).style.display = 'none';
  }

  ngOnInit() {

  }

}
