import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Circles } from './circles';
import { CirclesService } from '../services/circles.service';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})


export class CircleComponent implements OnInit {

 circles: Circles[];
 @Output() selectedCircle = new EventEmitter<any>();

 constructor(private circleService: CirclesService) { }

  getCircles() {
    this.circleService.getCircles().subscribe(data => {this.circles = data.json(); });
  }

  selectCircle(circledata: string) {
    const currentCircleName = { type : 'circle', value: 'circledata'};
    this.selectedCircle.emit(currentCircleName);
  }
  ngOnInit() {
    this.getCircles();   
  }  
  
var modal = document.getElementById( 'myModal' );
var btn = document.getElementById( "myButton" );
var span = document.getElementsByClassName( "close" )[0];

btn.onclick = function() {
    modal.style.display = "block";
}


span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function( event ) {
    if ( event.target == modal ) {
        modal.style.display = "none";
    }
}

}


