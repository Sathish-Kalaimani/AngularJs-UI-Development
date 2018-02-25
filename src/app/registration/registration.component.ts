import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private userService: UsersService, private router: Router) {}

  registerUser(form: NgForm) {
    console.log(form.value);
    this.userService.registerUser(form).subscribe(
      data => {
        if (data.status === 201) {
          this.router.navigate(['']);
         }
      }
      );
  }


  ngOnInit() {
      }
}
