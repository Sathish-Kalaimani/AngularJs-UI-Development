import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Welcome to the Dashboard' + ' ' + localStorage.getItem('username');
  currentSelected: object;

  constructor(private router: Router) { }

  onSelect(data) {
    console.log(data);
    this.currentSelected = data;
    console.log ('User is parent ', this.currentSelected);
  }

  signOut() {
    console.log('logged out Successfully');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.clear();
    this.router.navigate(['']);
  }
  ngOnInit() {
  }

}
