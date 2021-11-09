import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/User";
import config from "../apiconfig.json";
@Injectable()

export class UserApiService {

     baseUrl: string = `${config}/api/users`;

    constructor(private http:HttpClient){

       

    }

    get(){

        return this.http.get<User[]>(this.baseUrl).toPromise()
            
    }

    getById(id: string){

        return this.http.get<User>(this.baseUrl + '/' + id).toPromise()
            
    }

    post(user: User){

        return this.http.post<User>(this.baseUrl + '/register', user).toPromise();
    }

    delete(id: number){
            
        return this.http.delete<void>(this.baseUrl + '/' + id).toPromise()
    }

    put(user: User){

        return this.http.put<User>(this.baseUrl, user).toPromise()
            
    }

    authenticate(user: User){

        return this.http.post<User>(this.baseUrl + '/authenticate/',user).toPromise();
            
    }

}