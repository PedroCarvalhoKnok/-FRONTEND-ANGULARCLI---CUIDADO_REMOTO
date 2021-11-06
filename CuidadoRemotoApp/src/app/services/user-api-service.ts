import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/User";
@Injectable()

export class UserApiService {

     baseUrl: string = 'http://localhost:9091/api/users';

    constructor(private http:HttpClient){

       

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