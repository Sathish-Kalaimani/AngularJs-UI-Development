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
    currentCircle:String;
    
    @Output() selectedCircle = new EventEmitter<any>();
        
    constructor( private circleService: CirclesService, private userCircleService: UserCircleServiceService ) { }

    getCircles() {
        this.circleService.getCircles().subscribe( data => { this.circles = data.json(); } );
    }
    
    createGroup( circlename ) {
              
        var request = {'circleName': circlename,'creatorId':localStorage.getItem('username') };
        
        this.circleService.createCircle( request ).subscribe( data => {
            if ( data.status === 201 ) {
                alert( "Circle Created" );
                this.closeModal("myModal");
                circlename='';
            } else {
                alert( "Error Creating Circle" );
            }
        } );
    }

    selectCircle( circledata: string ) {
        const currentCircleName = { type: 'circle', value: circledata };
        this.selectedCircle.emit( currentCircleName );
    }
    
    getCircleName(name:string){
        this.currentCircle = name;
    }
    
    addUser(username){
       var request = {'username':username, 'circleName':this.currentCircle};
        console.log(username+' '+this.currentCircle);
        this.userCircleService.addUsers(request).subscribe(data=>{
           if(data.status === 200){
               alert("Added User SuccessFully");
               this.closeModal("newUser");
               username='';
           }else{
               alert("Error Adding User");
           }
       });
    }
    
    
    openModal(id) {
        document.getElementById( id ).style.display = 'block';
    }
    closeModal(id) {
        document.getElementById( id ).style.display = 'none';
    }
    
    ngOnInit() {
        this.getCircles();
    }
}


