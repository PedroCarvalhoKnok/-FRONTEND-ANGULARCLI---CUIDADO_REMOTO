import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/User";
import data from "../apiconfig.json";
import { Vacancy } from "../models/Vacancy";
@Injectable({ providedIn: 'root'})

export class VacancyApiService {
    

     baseUrl: string = `${(<any>data).urlBaseApi}/api/vagas`;

    // baseUserUrl: string = `http://localhost:9091/api/users`;

    constructor(private http:HttpClient){

    }

    get(){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        return this.http.get<User[]>(this.baseUrl + '/ListarVagas').toPromise()
            
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

    post(vacancy: Vacancy){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        this.http.post<User>(this.baseUrl + '/CadastrarVaga', {"nome": vacancy.vacancyName, "empresa": vacancy.companyName, "descricao": vacancy.description, "requisitos": vacancy.require, "beneficios": vacancy.benefits, "codigoVaga": vacancy._id}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });

    }

    delete(id: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })
            
        return this.http.delete<void>(this.baseUrl + '/ExcluirVaga/' + id).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
    }

    put(vacancy: Vacancy){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        this.http.put<User>(this.baseUrl + '/AlterarVaga', {"nome": vacancy.vacancyName, "empresa": vacancy.companyName, "descricao": vacancy.description, "requisitos": vacancy.require, "beneficios": vacancy.benefits, "codigoVaga": vacancy._id}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
            
    }
}