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

        return this.http.get<User[]>(this.baseUrl + '/ListarUsuarios').toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
            
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

        this.http.post<User>(this.baseUrl + '/CadastrarUsuario', {"Usuario": user.userName, "Nome": user.name, "Perfil": user.role, "Telefone": user.phone, "Email": user.email, "Senha": user.password}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });

    }

    delete(id: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })
            
        return this.http.delete<void>(this.baseUrl + '/ExcluirUsuario/' + id).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
    }

    put(user: User){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        this.http.put<User>(this.baseUrl + '/AlterarUsuario', {"Usuario": user.userName, "Nome": user.name, "Perfil": user.role, "Telefone": user.phone, "Email": user.email, "Senha": user.password}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
            
    }

}