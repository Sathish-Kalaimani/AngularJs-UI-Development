import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Jungle';
  currentSelected: object;

  onSelected(data) {
    this.currentSelected = data;
  }
}
