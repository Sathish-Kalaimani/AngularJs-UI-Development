import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Message} from './messages';
import {MessagesService} from '../messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnChanges {

  messages;
  userdata: string;
  message: any;
  receiver: string;
  circle: string;
  type: string;

  @Input() messageObj: object;


  constructor(private messageService: MessagesService) {}

  ngOnChanges(value) {
    console.log('value is', value);
    console.log('Object in msg', value.messageObj.currentValue.value);

    this.type = value.messageObj.currentValue.type;

    if (value.messageObj.currentValue.type === 'user') {
      this.receiver = value.messageObj.currentValue.value;
      this.messageService.getMessageFromUser(value.messageObj.currentValue.value).subscribe(
        data => {this.message = data.json(); });
    } else {
      this.messageService.getMessageByCircle(value.messageObj.currentValue.value).subscribe(
        data => {this.message = data.json(); });
    }

  }

  ngOnInit() {
    
  }

}
