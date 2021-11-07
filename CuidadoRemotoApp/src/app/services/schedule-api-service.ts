import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/User";
import { Schedule } from "../models/Schedule";
@Injectable()

export class ScheduleApiService {

     baseUrl: string = 'http://localhost:9091/api/schedule';

    constructor(private http:HttpClient){
       

    }

    post(schedule: Schedule){

        return this.http.post<Schedule>(this.baseUrl + '/register', schedule).toPromise();
    }

    delete(id: number){
            
        return this.http.delete<void>(this.baseUrl + '/' + id).toPromise()
    }

    put(schedule: Schedule){

        return this.http.put<Schedule>(this.baseUrl, schedule).toPromise()
            
    }

    
}