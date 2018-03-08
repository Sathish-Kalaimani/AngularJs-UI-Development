import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Message} from './messages';
import {MessagesService} from '../services/messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnChanges {

  messages = [];
  msg: Message;
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

  onClick(msg: string, type: string) {
    console.log('type', type);
    console.log('msg', msg);
    var request = {'message': msg};
    this.msg = new Message();
    this.msg.message = msg;
    this.msg.receiverId = this.receiver;
    this.msg.senderName = localStorage.getItem('username');

    if (type === 'user') {
      this.messageService.sendMessageToUser(this.msg).subscribe(
      data => { if (data.status === 200) {
        let obj = {
          'senderName': localStorage.getItem('username'),
          'receiverId': this.receiver,
          'message': msg
        };
        this.messages.push(obj);
        }
      });
    } else {
          this.messageService.sendMessageToCircle(request).subscribe(
          data => {
            if (data.status === 200) {
              let obj = {
                'senderName': localStorage.getItem('username'),
                'receiverId': this.receiver,
                'message': msg
              };
              this.message.push(obj);
            }
          });
      this.message = ' ';
      }
    }
  ngOnInit() {
  }
  }
