import {Component, OnInit, Input, OnChanges, SimpleChange} from '@angular/core';
import {Message} from './messages';
import {MessagesService} from '../services/messages.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnChanges {

  messages=[];
  userdata: string;
  message: any;
  msg: Message;
  receiver: string;
  circle: string;
  type: string;
  currentValue:string;
  UserName=[];
  name = localStorage.getItem('username');
  
  @Input() messageObj: object;

  constructor(private messageService: MessagesService,private userService:UsersService) {}

  
  ngOnChanges(values) {
    //console.log('Object in msg', values.messageObj.currentValue.value);

    this.type = values.messageObj.currentValue.type;

    if (values.messageObj.currentValue.type === 'user') {
      this.receiver = values.messageObj.currentValue.value;
      this.messageService.getMessagesFromUser(values.messageObj.currentValue.value).subscribe(
        data => {this.messages = data.json(); });
        //console.log(this.messages);
        this.userService.getUser(this.receiver).subscribe(data=>{this.UserName = data.json()});
    } else {
      this.circle = values.messageObj.currentValue.value;
      //console.log('this is circle '+this.circle);
      this.messageService.getMessagesByCircle(values.messageObj.currentValue.value).subscribe(
        data => {this.messages = data.json(); });
        console.log("Here is the message"+ this.UserName);
    }
    

  }

  onClick(msg: string, type: string) {
    //console.log('type', type);
    //console.log('msg', msg);
    var request = {'message': msg,'senderName':localStorage.getItem('username')};

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
      this.message = '';
    } else {
          this.messageService.sendMessageToCircle(request).subscribe(
          data => {
            if (data.status === 200) {
              let obj = {
                'senderName': localStorage.getItem('username'),
                'receiverId': this.receiver,
                'message': msg
              };
              this.messages.push(obj);
            }
          });
      this.message = '';
      }
    }


    ShowBox(id){
      if(this.type ==='user'|| this.type ==='circle'){
      document.getElementById(id).style.display ="block";
    }else{
      document.getElementById(id).style.display="none";
    }
    }

  ngOnInit() {

  var input = document.getElementById('MyInput');
    input.addEventListener("keyup",function(event){
      event.preventDefault();
      if(event.keyCode === 13){
        document.getElementById('send').click();
      }
    });    
  }
  }
