import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/User";
import { Schedule } from "../models/Schedule";
import config from "../apiconfig.json";
@Injectable()

export class ScheduleApiService {

     baseUrl: string = `${config}/api/schedule`;

    constructor(private http:HttpClient){
       

    }

    get(token: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        return this.http.get<Schedule[]>(this.baseUrl,{headers: headers}).toPromise()
            
    }

    getById(id: number, token: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        return this.http.get<Schedule[]>(this.baseUrl + '/' + id,{headers: headers}).toPromise()
            
    }

    post(schedule: Schedule, token: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        return this.http.post<Schedule>(this.baseUrl + '/register', schedule,{headers: headers}).toPromise();
    }

    delete(id: number, token: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
            
        return this.http.delete<void>(this.baseUrl + '/' + id).toPromise()
    }

    put(schedule: Schedule, token: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        return this.http.put<Schedule>(this.baseUrl, schedule).toPromise()
            
    }

    
}