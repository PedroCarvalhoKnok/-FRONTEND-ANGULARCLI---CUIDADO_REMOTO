import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/User";
//import config from "../apiconfig.json";
@Injectable({ providedIn: 'root'})

export class UserApiService {

     baseUrl: string = `http://localhost:9091/api/users`;

    constructor(private http:HttpClient){

    }

    get(){

        return this.http.get<User[]>(this.baseUrl).toPromise()
            
    }

    getById(id: string){

        return this.http.get<User>(this.baseUrl + '/' + id).toPromise()
            
    }

    post(user: User){

        return this.http.post<User>(this.baseUrl + '/register', {"username": user.name, "password": user.password, "role": user.role, "phone": user.phone, "birth": user.birthDate, "email": user.email}).toPromise();
    }

    delete(id: string){
            
        return this.http.delete<void>(this.baseUrl + '/' + id).toPromise()
    }

    put(user: User){

        return this.http.put<User>(this.baseUrl, user).toPromise()
            
    }

    authenticate(user: User){

        return this.http.post<User>(this.baseUrl + '/authenticate',{"username": user.email, "password": user.password}).toPromise();
            
    }

}