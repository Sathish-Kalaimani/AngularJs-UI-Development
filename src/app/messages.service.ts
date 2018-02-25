import { Injectable } from '@angular/core';
import { Message } from './message/messages';
import { Http } from '@angular/http';

@Injectable()
export class MessagesService {

  constructor(private http: Http) { }

  username: string;
  circle: string;

  private BASE_URL = 'http://localhost:8083/api/message/';

  getMessageFromUser(username: any) {
    this.username = username;
    return this.http.get(this.BASE_URL + 'getMessageByUser/' + username + '/' + 2 );
  }

  getMessageByCircle(circle) {
    this.circle = circle;
    return this.http.get(this.BASE_URL + 'getMessageByCircle/' + circle + '/2');
  }
}
