import { Injectable } from '@angular/core';
import { Circles } from '../circle/circles';
import { Http, Headers } from '@angular/http';

@Injectable()
export class CirclesService {

    constructor(private http: Http) { }

    private CIRCLE_SERVICE_BASE_URL = 'http://localhost:8084/api/circle';

    headerObj = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    getCircles() {
        return this.http.get(this.CIRCLE_SERVICE_BASE_URL, { headers: this.headerObj });
    }

    createCircle(data) {
        return this.http.post(this.CIRCLE_SERVICE_BASE_URL, data, { headers: this.headerObj });
    }
}
