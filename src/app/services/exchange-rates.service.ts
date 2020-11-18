import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfiguration } from '../config/api.config';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ExchangeRatesService {

  constructor(private http : HttpClient, private authenticationService : AuthenticationService) {  }

  getExchangeRate(fromCurrency: String, toCurrency: String) {
    let header : HttpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${AuthenticationService.token}`
    });

    let requestUrl = apiConfiguration.host + apiConfiguration.exchangeRateRoute + `?from=${fromCurrency}&to=${toCurrency}`;
    return this.http.get(requestUrl, { headers : header });
  }

  getExchangeRateForLastMonth(fromCurrency: String, toCurrency: String, vendor : String) {
    let header : HttpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${AuthenticationService.token}`
    });

    let requestUrl = apiConfiguration.host + apiConfiguration.exchangeRateRoute + `/${vendor}?from=${fromCurrency}&to=${toCurrency}`;
    return this.http.get(requestUrl, { headers : header });
  }

  getExchangeRateForRange(fromCurrency: String, toCurrency: String, startDate : Date, endDate : Date) {
    let header : HttpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${AuthenticationService.token}`
    });

    let requestUrl = apiConfiguration.host + apiConfiguration.exchangeRateForRangeRoute +
      `?from=${fromCurrency}&to=${toCurrency}&startDate=${startDate.toLocaleDateString('en-US')}&endDate=${endDate.toLocaleDateString('en-US')}`;
    return this.http.get(requestUrl, { headers : header });
  }
}
