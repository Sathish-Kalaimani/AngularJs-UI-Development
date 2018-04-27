import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
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
    url:any;

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
        this.userservice.getUser(localStorage.getItem('username')).subscribe(data => {this.uname = data.json();
        localStorage.setItem('loggedInUserName',data.json().name)})
        //console.log(localStorage.getItem('loggedInUserName'));
    }


    updateDetails(form:NgForm){
        console.log(form.value);
        this.userservice.updateUser(form).subscribe(data=>{
            if(data.status === 200){
                alert("User Details Updated Successfully!!!");
                this.closeModal('addData');
            }
        });
    }

    Upload(){
        if(this.url != null){
            this.userservice.uploadImage(document.forms.namedItem("fileinfo")).subscribe(data=>{
                if(data.status === 200){
                    alert ("File Uploaded successfully");
                    this.closeModal('uploadImage');
                    location.reload();
                }
            });
        }else{
            console.log('file is empty');
        }
    }

    openModal(id){
        document.getElementById(id).style.display='block';
    }

    closeModal(id){
        document.getElementById(id).style.display='none';
    }

    uploadImages(event){
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
      
            reader.readAsDataURL(event.target.files[0]); // read file as data url
      
            reader.onload = (event) => { // called once readAsDataURL is completed
              this.url = reader.result;
            }
          }
    }

    ClearInput(){
        document.forms.namedItem('fileinfo').reset();
        this.url=null;
    }
    ngOnInit() {
        this.getName(); 
    }

}
