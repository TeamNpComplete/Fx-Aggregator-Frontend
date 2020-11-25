import { Component, ViewChild, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { appConfiguration } from 'src/app/config/app.config';
import { ExchangeRateModel } from 'src/app/models/exchange-rate.model';
import { ExchangeRatesService } from '../../services/exchange-rates.service';

@Component({
  selector: 'app-icons',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
  providers: [ExchangeRatesService]
})
export class CurrencyExchangeComponent implements OnInit, AfterViewInit {

  primaryCurrency: String = 'USD';
  secondaryCurrency: String = null;
  viewExchangeRateTable: Boolean = false;
  amountToConvert: Number = null;

  currencyRates: ExchangeRateModel[] = [];

  @Output() currenciesChanged : EventEmitter<any> = new EventEmitter();

  displayedColumns: String[] = ['vendor', 'rate', 'amount'];
  // ['USD', 'EUR', 'INR', 'JPY', 'GBP', 'CNY', 'AUD', 'CAD', 'CHF'],
  currencies: String[] = appConfiguration.supportedCurrencies;
  dataSource = new MatTableDataSource(this.currencyRates);
  public copy: string;
   currencyMap = new Map([
    [this.currencies[0], "flag-icon flag-icon-us"],
    [this.currencies[1], ""],
    [this.currencies[2], "flag-icon flag-icon-in"],
    [this.currencies[3], "flag-icon flag-icon-jp"],
    [this.currencies[4], "flag-icon flag-icon-gb"],
    [this.currencies[5], "flag-icon flag-icon-cn"],
    [this.currencies[6], "flag-icon flag-icon-au"],
    [this.currencies[7], "flag-icon flag-icon-ca"],
    [this.currencies[8], "flag-icon flag-icon-ch"]
]);

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }


  constructor(private exchangeRatesService: ExchangeRatesService) {

  }

  ngOnInit() {
    this.primaryCurrency = 'USD';
    this.secondaryCurrency = 'INR';
    //this.viewExchangeRateTable = true;
  }

  ngAfterViewInit() {

  }

  setDataSourceAttributes() {
    this.dataSource = new MatTableDataSource(this.currencyRates);
    this.dataSource.sort = this.sort;
  }

  onCheckRatesClicked() {
    this.viewExchangeRateTable = true;
    this.exchangeRatesService.getExchangeRate(this.primaryCurrency, this.secondaryCurrency).subscribe(
      (response: ExchangeRateModel[]) => {

        response.forEach((exchangeRate: ExchangeRateModel) => {
          let convertedAmount = Number(exchangeRate.rate) * Number(this.amountToConvert);
          exchangeRate.amount = convertedAmount;
        });

        this.currencyRates = response;
        this.setDataSourceAttributes();
      },
      (error) => {
        console.log(error);
        this.currencyRates = [
          { vendor: 'European Central Bank', rate: 1.9, amount: 1.9 * 10000 },
          { vendor: 'Union Bank Of Switzerland', rate: 2.0, amount: 2.0 * 10000 }
        ];
        this.setDataSourceAttributes();
      }
    )
  }

  onCurrencyChanged() {
    this.currenciesChanged.emit({
      'primary' : this.primaryCurrency,
      'secondary' : this.secondaryCurrency
    });
  }
}
