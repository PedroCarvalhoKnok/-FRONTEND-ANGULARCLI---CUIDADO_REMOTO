import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/User";
import data from "../apiconfig.json";
import { Course } from "../models/Course";
@Injectable({ providedIn: 'root'})

export class CourseApiService {
    

     baseUrl: string = `${(<any>data).urlBaseApi}/api/curso`;

    // baseUserUrl: string = `http://localhost:9091/api/users`;

    constructor(private http:HttpClient){

    }

    get(){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        return this.http.get<User[]>(this.baseUrl + '/ListarCursos').toPromise()
            
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

        this.http.post<Course>(this.baseUrl + '/CadastrarCurso', {"Nome": course.courseName, "Descricao": course.description, "EmpresaFornecedora": course.companyOffer}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });

    }

    delete(id: string){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })
            
        return this.http.delete<void>(this.baseUrl + '/ExcluirCurso/' + id).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
    }

    put(course: Course){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        this.http.put<User>(this.baseUrl + '/AlterarCurso', {"Nome": course.courseName, "Descricao": course.description, "EmpresaFornecedora": course.companyOffer, "CodigoCurso": course._id}).toPromise().then(function(resp){
            return resp;
        }, function(err) {
            return err;
        });
            
    }
}