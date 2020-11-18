import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
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

  primaryCurrency: String = null;
  secondaryCurrency: String = null;
  viewExchangeRateTable: Boolean = false;
  amountToConvert: Number = null;

  currencyRates: ExchangeRateModel[] = [];

  displayedColumns: String[] = ['vendor', 'rate', 'amount'];

  currencies: String[] = appConfiguration.supportedCurrencies;
  dataSource = new MatTableDataSource(this.currencyRates);
  public copy: string;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }


  constructor(private exchangeRatesService: ExchangeRatesService) {

  }

  ngOnInit() {
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

}
