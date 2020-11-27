import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConfiguration } from '../config/api.config';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn : 'root'
})

export class PredictionService{

  static data = null;
  static actualData = null;
  static previousPredictedDataPrimary = null;
  static previousPredictedDataSecondary = null;

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

  getActualRate() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AuthenticationService.token}`
    });
    let requestUrl = apiConfiguration.actualHost + apiConfiguration.actualRoute;
    return this.http.get(requestUrl, { headers: header });
  }

  getPreviousPredictionRate(pCurency:string)
  {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AuthenticationService.token}`
    });
    let requestUrl = apiConfiguration.previousPredictionHost + apiConfiguration.previousPredictionRoute+"?cur="+pCurency;
    return this.http.get(requestUrl, { headers: header });
  }

}

