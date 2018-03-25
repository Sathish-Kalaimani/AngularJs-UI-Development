import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Users } from './users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Users[];
  selectedData: string;
  @Output() selectedUser = new EventEmitter<any>();
   constructor(private usersService: UsersService) { }

  selectUser(userdata: string) {
    const currentUserValue = {type: 'user', value: userdata};
    this.selectedUser.emit(currentUserValue);
  }

  getUsers() {
    this.usersService.getUsers().subscribe(data => {this.users = data.json(); });
  }

  ngOnInit() {
    this.getUsers();
  }

}
