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

        return this.http.get<Schedule[]>(this.baseUrl + '/' + id,{headers: headers}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
            
    }

    post(schedule: Schedule, token: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

         this.http.post<Schedule>(this.baseUrl, {"scheduleName": schedule.category,"diaSemana": schedule.dayOfWeek, "detalhes": schedule.details, "agendamento": schedule.time, "userId": schedule.userId},{headers: headers}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
    }

    delete(id: string, token: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
            
        return this.http.delete<void>(this.baseUrl + '/' + id, {headers: headers}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
    }

    put(schedule: any, token: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        console.log(schedule);

        this.http.put<any>(this.baseUrl,{"scheduleName": schedule.scheduleName,"diaSemana": schedule.diaSemana, "detalhes": schedule.detalhes, "agendamento": schedule.agendamento, "_id": schedule._id},{headers: headers}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
            
    }

    
}