import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/User";
import data from "../apiconfig.json";
@Injectable({ providedIn: 'root'})

export class UserApiService {

     baseUrl: string = `${(<any>data).urlBaseApi}/api/usuario`;

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

    post(user: User){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        this.http.post<User>(this.baseUrl, {"userName": user.userName, "name": user.name, "role": user.role, "phone": user.phone, "email": user.email, "password": user.password},{headers: headers}).toPromise().then(function(resp){
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

    put(user: User){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        this.http.put<User>(this.baseUrl, {"userName": user.userName, "name": user.name, "role": user.role, "phone": user.phone, "email": user.email, "password": user.password, "userId": user._id},{headers: headers}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
            
    }

}