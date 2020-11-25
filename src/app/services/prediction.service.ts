import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConfiguration } from '../config/api.config';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn : 'root'
})

export class PredictionService{

  static data = null;
  constructor(private http: HttpClient) {

   }

  getPredictionRate() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AuthenticationService.token}`
    });

    let requestUrl = apiConfiguration.predictionHost + apiConfiguration.predictionRoute;
    return this.http.get(requestUrl, { headers: header });
  }

}

