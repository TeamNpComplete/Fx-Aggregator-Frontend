import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthGuardService implements CanActivate{
    
    constructor(private authenticationService : AuthenticationService) {

    }

    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean{
        return AuthenticationService.isAuthenticated();
    }
}