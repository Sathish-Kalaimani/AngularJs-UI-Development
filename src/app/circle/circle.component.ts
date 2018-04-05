import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Circles } from './circles';
import { NgForm } from '@angular/forms';
import { CirclesService } from '../services/circles.service';
import { UserCircleServiceService } from '../services/user-circle-service.service';

@Component( {
    selector: 'app-circle',
    templateUrl: './circle.component.html',
    styleUrls: ['./circle.component.css']
} )


export class CircleComponent implements OnInit {

    user = localStorage.getItem('username');
    circles: Circles[];
    creatorId:string;
    circleName:string;
    circleUsers=[];
    currentCircle:string;
    myCircles= [];
    selectedCircleName = { type:'no',value:'no'};

    @Output() selectedCircle = new EventEmitter<any>();
        
    constructor( private circleService: CirclesService, private userCircleService: UserCircleServiceService ) { }

    getCircles() {
        //this.circleService.getCircles().subscribe( data => { this.circles = data.json(); } );
        this.userCircleService.getMyCircles().subscribe(data => {this.myCircles = data.json();});
        console.log('this is'+this.myCircles);
    }
    
    createGroup( circlename ) {
              
        var request = {'circleName': circlename,'creatorId':localStorage.getItem('username') };
        
        this.circleService.createCircle( request ).subscribe( data => {
            if ( data.status === 201 ) {
                alert("Circle Created Successfully");
                var payload = {'username':localStorage.getItem('username'), 'circleName':circlename};
                this.userCircleService.addUsers(payload).subscribe(d =>{
                    if(d.status === 200){
                        alert("User Added Successfully");
                    }
                });
                circlename='';
                this.closeModal("myModal");
                
            } else {
                alert( "Error Creating Circle" );
            }
        } );

        
    }

    selectCircle( circledata: string ) {
        this.selectedCircleName = { type: 'circle', value: circledata };
        this.selectedCircle.emit( this.selectedCircleName );
    }
    
    getCircleName(name:string){
        this.currentCircle = name;
        console.log("this is the circle" +this.currentCircle);
        this.getUsersFromCircle();
    }
    
    addUser(username){
       var request = {'username':username, 'circleName':this.currentCircle};
        console.log(username+' '+this.currentCircle);
        this.userCircleService.addUsers(request).subscribe(data=>{
           if(data.status === 200){
               alert("Added User SuccessFully");
               this.closeModal("newUser");
               username='';
               location.reload();
           }else{
               alert("Error Adding User");
           }
       });
    }
    
    getUsersFromCircle(){
        this.userCircleService.getCircleUsers(this.currentCircle).subscribe(data =>{
            this.circleUsers = data.json();
        });
        console.log(this.circleUsers);
    }

    openModal(id) {
        document.getElementById( id ).style.display = 'block';
    }
    closeModal(id) {
        document.getElementById( id ).style.display = 'none';
    }
    
    ngOnChanges(){
        this.getUsersFromCircle();
    }

    ngOnInit() {
        this.getCircles();
    }
}


