import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Users } from './users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  //require: (filename: string) => any;
  users: Users[];            
  selectedData: string;
  userSelected: string;
  userDetails=[];
  currentUser= localStorage.getItem('username');
  url:any;


  @Output() selectedUser = new EventEmitter<any>();
   constructor(private usersService: UsersService) { }
   
  selectUser(userdata: string) {
    const currentUserValue = {type: 'user', value: userdata};
    this.userSelected=userdata;
    this.selectedUser.emit(currentUserValue);
  }

  getUsers() {
    this.usersService.getUsers().subscribe(data => {this.users = data.json(); });
  }

  getDetails(){
    this.usersService.getUser(this.userSelected).subscribe(data=>{this.userDetails = data.json();});
  }
    
  user_ellipsis(id) {
      document.getElementById( id ).style.display = 'block';
  }

  closeModal(id) {
      document.getElementById( id ).style.display = 'none';
  }
  
  ngOnInit() {
    this.getUsers();
    
    /*-Start of Code for Accordion-*/
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }
    /*-End of Code for Accordion-*/
  }

}
