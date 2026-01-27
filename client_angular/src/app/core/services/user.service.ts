import { Observable } from "rxjs";
import { User } from "../../shared/models/user.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn:'root'
})
export class UserService{
    private url = "http://localhost:3000/users"
    constructor(private httpClient:HttpClient){

    }

    getUsers():Observable<User[]>{
        return this.httpClient.get<User[]>(this.url)
    }
}