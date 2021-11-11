import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Schedule } from "../models/Schedule";
import config from "../apiconfig.json";
@Injectable({ providedIn: 'root'})

export class ScheduleApiService {

     baseUrl: string = `http://localhost:9091/api/schedule`;

    constructor(private http:HttpClient){
       

    }

    get(token: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        return this.http.get<Schedule[]>(this.baseUrl,{headers: headers}).toPromise()
            
    }

    getById(id: string, token: string){

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

        return this.http.post<Schedule>(this.baseUrl + '/register', {"dayOfWeek": schedule.dayOfWeek,"category": schedule.category, "details": schedule.details, "time": schedule.time},{headers: headers}).toPromise();
    }

    delete(id: string, token: string){

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