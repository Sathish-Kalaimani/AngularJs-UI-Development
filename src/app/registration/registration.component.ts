import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  error:string;
  user:string;
  constructor(private userService: UsersService, private router: Router) {}

  register(form: NgForm) {
    console.log(form.value);
    this.userService.register(form).subscribe(
      data => {
        if (data.status === 201) {
          alert('Registeration Successfull');
          this.router.navigate(['']);
          this.error='';
          }
         },
          error=>{
          if(error.status!==201) {
             this.error="Registration Failed. Try Again"
         }
      });
  }

  getUser(uname){
    this.userService.getUser(uname).subscribe(data=>{
      if(data.status===200){
        this.user = "Oops! Username is taken. Try a different one";
      }
    },
    user=>{
      if(user.status!=200){
        this.user ='';
      }
    });
  }

  ngOnInit() {
      }
}
