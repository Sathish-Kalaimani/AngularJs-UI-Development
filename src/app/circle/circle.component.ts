import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Circles } from './circles';
import { CirclesService } from '../services/circles.service';

@Component( {
    selector: 'app-circle',
    templateUrl: './circle.component.html',
    styleUrls: ['./circle.component.css']
} )


export class CircleComponent implements OnInit {

    circles: Circles[];
    @Output() selectedCircle = new EventEmitter<any>();

    constructor( private circleService: CirclesService ) { }

    getCircles() {
        this.circleService.getCircles().subscribe( data => { this.circles = data.json(); } );
    }

    selectCircle( circledata: string ) {
        const currentCircleName = { type: 'circle', value: 'circledata' };
        this.selectedCircle.emit( currentCircleName );
    }
    ngOnInit() {
        this.getCircles();
    }

    openModal() {
        document.getElementById( "myModal" ).style.display = "block";
    }
    closeModal() {
        document.getElementById( "myModal" ).style.display = "none";
    }
}


