import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfiguration } from '../config/api.config';

@Injectable()
export class ExchangeRatesService {

  constructor(private http : HttpClient) { }

  getExchangeRate(fromCurrency: String, toCurrency: String) {
    let requestUrl = apiConfiguration.host + apiConfiguration.exchangeRateRoute + `?from=${fromCurrency}&to=${toCurrency}`;
    return this.http.get(requestUrl);
  }

  getExchangeRateForLastMonth(fromCurrency: String, toCurrency: String, vendor : String) {
    let requestUrl = apiConfiguration.host + apiConfiguration.exchangeRateRoute + `/${vendor}?from=${fromCurrency}&to=${toCurrency}`;
    return this.http.get(requestUrl);
  }

  getExchangeRateForRange(fromCurrency: String, toCurrency: String, startDate : Date, endDate : Date) {
    let requestUrl = apiConfiguration.host + apiConfiguration.exchangeRateForRangeRoute +
      `?from=${fromCurrency}&to=${toCurrency}&startDate=${startDate.toLocaleDateString('en-US')}&endDate=${endDate.toLocaleDateString('en-US')}`;
    return this.http.get(requestUrl);
  }
}
