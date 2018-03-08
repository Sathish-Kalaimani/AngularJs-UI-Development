import { Injectable } from '@angular/core';
import { Message } from '../message/messages';
import { Http, Headers } from '@angular/http';

@Injectable()
export class MessagesService {

  constructor(private http: Http) { }

  username: string;
  circle: string;

  private BASE_URL = 'http://localhost:8083/api/message/';

  headerObj = new Headers({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  getMessageFromUser(username: any) {
    this.username = username;
    console.log('In Service', username);
    const loggedInUser = localStorage.getItem('username');
    return this.http.get(this.BASE_URL + 'getMessagesByUser/' + loggedInUser + '/' + username +'/'+ 2, {headers: this.headerObj} );
  }

  getMessageByCircle(circle) {
    this.circle = circle;
    return this.http.get(this.BASE_URL + 'getMessagesByCircle/' + circle + '/2');
  }

  sendMessageToUser(message: Message) {
    return this.http.post(this.BASE_URL + 'sendMessageToUser/' + message.receiverId, message,{headers:this.headerObj});
  }

  sendMessageToCircle(message:any) {
    return this.http.post(this.BASE_URL + 'sendMessageToCircle/' + this.circle, message ,{headers:this.headerObj});
  }
}
