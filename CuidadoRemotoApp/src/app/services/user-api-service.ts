import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/User";
import data from "../apiconfig.json";
@Injectable({ providedIn: 'root'})

export class UserApiService {
    

     baseUrl: string = `${(<any>data).urlBaseApi}/api/customer`;

    // baseUserUrl: string = `http://localhost:9091/api/users`;

    constructor(private http:HttpClient){

    }

    get(token: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        return this.http.get<User[]>(this.baseUrl).toPromise()
            
    }

    getById(id: string,token: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        return this.http.get<User>(this.baseUrl + '/' + id,{headers: headers}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
            
    }

    post(user: User, token: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        this.http.post<User>(this.baseUrl, {"client": user.name, "password": user.password, "role": user.role, "phone": user.phone, "birth": user.birthDate, "email": user.email},{headers: headers}).toPromise().then(function(resp){
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
            
        return this.http.delete<void>(this.baseUrl + '/' + id,{headers: headers}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
    }

    put(user: User, token: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        this.http.put<User>(this.baseUrl, {"client": user.name, "password": user.password, "role": user.role, "phone": user.phone, "birth": user.birthDate, "email": user.email, "_id": user._id},{headers: headers}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
            
    }

    authenticate(user: User,token: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        console.log(this.baseUrl);

        return this.http.post<User>(this.baseUrl + '/authenticate',{"client": user.email, "password": user.password},{headers: headers}).toPromise();
            
    }

}