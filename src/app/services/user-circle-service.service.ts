import { Injectable } from '@angular/core';
import { Circles } from '../circle/circles';
import { Http, Headers } from '@angular/http';

@Injectable()
export class UserCircleServiceService {

  constructor(private http:Http) { }
  private USERCIRCLE_SERVICE_BASE_URL = 'http://localhost:8085/api/usercircle';
  
  headerObj = new Headers({
      'Authorization': 'Bearer '+localStorage.getItem('token')
  })
      
  addUsers(response){
      return this.http.put(this.USERCIRCLE_SERVICE_BASE_URL+'/addToCircle/'+response.username+'/'+response.circleName,response,{ headers: this.headerObj });
  }

  getMyCircles(){
      return this.http.get(this.USERCIRCLE_SERVICE_BASE_URL+'/searchByUser/'+localStorage.getItem('username'), { headers: this.headerObj });
  }

  getCircleUsers(circleName){
      return this.http.get(this.USERCIRCLE_SERVICE_BASE_URL+'/searchByCircle/'+circleName, {headers : this.headerObj})
  }

  removeUser(request){
      return this.http.put(this.USERCIRCLE_SERVICE_BASE_URL+'/removeFromCircle/'+request.circleName+'/'+request.username,request, {headers:this.headerObj})
  }
}
