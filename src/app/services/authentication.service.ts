import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiConfiguration } from '../config/api.config';

@Injectable({
    providedIn : 'root'
})
export class AuthenticationService {

    name : String;
    email : String;
    static token : String = "";

    constructor(private http : HttpClient) { }

    login(email : String, password : String) {
        let requestUrl = apiConfiguration.host + apiConfiguration.usersRoute + `/login`;

        let obj  = {
            email : email,
            password : password
        }

        return this.http.post(requestUrl, obj);
    }

    register(name : String, email : String, password : String ) {
        let requestUrl = apiConfiguration.host + apiConfiguration.usersRoute + `/register`;
        
        return this.http.post(requestUrl, { name : name, email : email, password : password});
    }

    static isAuthenticated() {
        return AuthenticationService.token != null && AuthenticationService.token != "";
    }
}
