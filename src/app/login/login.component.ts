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

  constructor(private userservice: UsersService, private router: Router ) { }

  logform(form: NgForm) {
    console.log(form.value);
    this.userservice.authenticateUser(form).subscribe(data =>  {
      if (data.status === 200) {
        this.router.navigate(['/dashboard']);
        location.reload();
        localStorage.setItem('token', data.json().token);
        localStorage.setItem('username', form.value.username);
      }else{
          alert("Invalid Credentials");
      }
    });
  }

  myFunction(text,id){
    console.log(text) ;
    if(typeof text !=='undefined'){
      document.getElementById(id).classList.add('has-val');
    }else{
      document.getElementById(id).classList.remove('has-val');
    }
  }
  
  openModel(id){
  document.getElementById(id).style.display='block';
}
closeModel(id){
  document.getElementById(id).style.display='none';
}

  ngOnInit() {
          
   }

}
