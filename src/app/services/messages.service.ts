import { Injectable } from '@angular/core';
import { Message } from '../message/messages';
import { Http, Headers } from '@angular/http';

@Injectable()
export class MessagesService {

  constructor(private http: Http) { }

  username: string;
  circle: string;

  private BASE_URL = 'http://localhost:8086/api/message/';

  headerObj = new Headers({
  'Authorization': 'Bearer ' + localStorage.getItem('token') });

  getMessageFromUser(userName: any) {
    this.username = userName;
    console.log('In service', userName);
    const loggedInUser = localStorage.getItem('username');
    return this.http.get(this.BASE_URL + 'getMessagesByUser/' + loggedInUser + '/' + userName + '/' + 2, {headers: this.headerObj});
  }

  sendMessageToUser(message: Message) {
    return this.http.post(this.BASE_URL + 'sendMessageToUser/' + message.receiverId, message, {headers: this.headerObj});
  }

  getMessageByCircle(circle) {
    this.circle = circle;
    return this.http.get(this.BASE_URL + 'getMessagesByCircle/' + circle + '/2', {headers: this.headerObj});
  }

  sendMessageToCircle(message: any) {
    return this.http.post(this.BASE_URL + 'sendMessageToCircle/' + this.circle, message, {headers: this.headerObj});
  }
}
