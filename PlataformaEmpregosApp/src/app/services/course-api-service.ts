import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/User";
import data from "../apiconfig.json";
import { Course } from "../models/Course";
@Injectable({ providedIn: 'root'})

export class CourseApiService {
    

     baseUrl: string = `${(<any>data).urlBaseApi}/api/cursos`;

    // baseUserUrl: string = `http://localhost:9091/api/users`;

    constructor(private http:HttpClient){

    }

    get(){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        return this.http.get<User[]>(this.baseUrl).toPromise()
            
    }

    getById(id: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        return this.http.get<User>(this.baseUrl + '/' + id,{headers: headers}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
            
    }

    post(course: Course){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        this.http.post<User>(this.baseUrl, {"courseName": course.courseName, "description": course.description, "companyOffer": course.companyOffer},{headers: headers}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });

    }

    delete(id: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })
            
        return this.http.delete<void>(this.baseUrl + '/' + id,{headers: headers}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
    }

    put(course: Course){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        this.http.put<User>(this.baseUrl, {"courseName": course.courseName, "description": course.description, "companyOffer": course.companyOffer, "courseId": course._id},{headers: headers}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
            
    }
}