import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface ExchangeRate {
  vendor: String,
  exchangeRate: Number,
  amount: Number
}


@Component({
  selector: 'app-icons',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss']
})
export class CurrencyExchangeComponent implements OnInit, AfterViewInit {

  primaryCurrency = 'Select Value';
  secondaryCurrency = 'Select Value';
  viewExchangeRateTable = false;

  currencyRates: ExchangeRate[] = [
    { vendor: 'European Central Bank', exchangeRate: 1.9, amount: 1.9 * 10000},
    { vendor: 'Union Bank Of Switzerland', exchangeRate: 2.0 , amount: 2.0 * 10000}
  ];

  displayedColumns = ['vendor', 'exchangeRate', 'amount'];

  currencies = ['USD', 'EUR', 'INR', 'JPY', 'ABC', 'XYZ'];
  dataSource = new MatTableDataSource(this.currencyRates);
  public copy: string;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
  }
  onCheckRatesClicked() {
    this.viewExchangeRateTable = true;
  }
}
