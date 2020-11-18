import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiConfiguration } from '../config/api.config';

@Injectable({
    providedIn : 'root'
})
export class AuthenticationService {

    name : String;
    email : String;
    token : String = "";

    constructor(private http : HttpClient) { }

    login(email : String, password : String) {
        let requestUrl = apiConfiguration.host + apiConfiguration.usersRoute + `/login`;

        let obj  = {
            email : email,
            password : password
        }

        this.http.post(requestUrl, obj).subscribe(
            (response) => { this.token = response['token']; console.log(response); },
            (error) => { console.log(error); },
        )
    }

    register(name : String, email : String, password : String ) {
        let requestUrl = apiConfiguration.host + apiConfiguration.usersRoute + `/login`;
        this.http.post(requestUrl, { name : name, email : email, password : password}).subscribe(
            (response) => { this.token = response['token']; },
            (error) => { console.log(error); }
        )
    }

    getToken() {
        return this.token;
    }
}
