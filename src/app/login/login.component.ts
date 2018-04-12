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
  pass:string;
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
        if (error.status === 401) {
          this.error = "Invalid Credentials";
        }else{
          this.error = "Server Down. Grab a Cup of Tea";
        }

      });
  }

  match(password,confirm_password){
    console.log(password+' '+confirm_password);
    if(password===confirm_password){
      this.error='';
     
    }else{
      this.pass = "Password Doesn't Match";
      password='';
      confirm_password='';
    }
  }

  resetPassword(username,password){
    var request = {'username':username,'password':password};
    this.userservice.passwordReset(username,request).subscribe(data=>{
      if(data.status === 200){
        alert("Password Reset Successfully");
        this.closeModal('myModal');
      }
    });
  }

  getUser(username){
    this.userservice.getUser(username).subscribe(data=>{
      if(data.status === 200){
        this.pass='';
      }
    },
    pass =>{
      if(pass.status === 404){
        this.pass ="Invalid Username";
      }
    });
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
