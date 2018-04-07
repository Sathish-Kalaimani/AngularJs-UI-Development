import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component( {
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
} )
export class DashboardComponent implements OnInit {

    title = 'Welcome';
    uname=[];
    currentSelected: object;

    constructor( private userservice: UsersService, private router: Router ) { }

    onSelect( data ) {
        console.log( data );
        this.currentSelected = data;
        console.log( 'User is parent ', this.currentSelected );
    }

    signOut() {
        console.log( 'logged out Successfully' );
        localStorage.removeItem( 'token' );
        localStorage.removeItem( 'username' );
        localStorage.clear();
        this.router.navigate( [''] );
    }

    getName(){
        this.userservice.getUser(localStorage.getItem('username')).subscribe(data => {this.uname = data.json();});
    }

    ngOnInit() {
        this.getName();
    }

}
