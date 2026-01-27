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
    createUser(name:string,email:string){
        
        return this.httpClient.post<User>(`http://localhost:3000/users/create`,{name,email})
    }
    editUser(name:string|undefined,email:string|undefined,id:string|undefined):Observable<User>{
        return this.httpClient.put<User>(`${this.url}/${id}`,{name,email})
    }
}