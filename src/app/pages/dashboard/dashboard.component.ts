///import { ExchangeRatesService } from './../../services/exchange-rates.service';

// import { ExchangeRate } from './../currency-exchange/currency-exchange.component';
import { Component, OnInit } from '@angular/core';
// import Chart from 'chart.js';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { appConfiguration } from 'src/app/config/app.config';
import { ExchangeRateModel } from 'src/app/models/exchange-rate.model';
import { ExchangeRatesService } from '../../services/exchange-rates.service';

import {MatDatepickerModule} from '@angular/material/datepicker';
  

// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2
// } from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ExchangeRatesService]
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public currencyArray = [10, 12, 12, 34, 45, 22, 11, 34, 45, 23, 32, 12, 15, 56, 10, 12, 12, 34, 45, 22, 11, 34, 45, 23, 32, 12, 15, 56];


  primaryCurrency: String = null;
  secondaryCurrency: String = null;
  vendorValue: String = null;
  viewExchangeRateTable: Boolean = false;
  amountToConvert: Number = null;
  currencyRates: ExchangeRateModel[] = [];
  primaryCurrency1: String = null;
  secondaryCurrency1: String = null;
  startDate: Date = null;
  endDate: Date = null;
  displayedColumns: String[] = ['vendor', 'exchangeRate', 'amount'];

  currencies: String[] = appConfiguration.supportedCurrencies;
  vendors : String[] = appConfiguration.supportedVendors;
  dataSource = new MatTableDataSource(this.currencyRates);

  public lineChartLabels: Label[];
  // public lineChartOptions: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  // };
  public lineChartColors: Color[] = [
    {
      borderColor: '#5e72e4',

    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

 today: Date = new Date();
 year = this.today.getFullYear();
 month = this.today.getMonth();
 date = this.today.getDate();
 dates = [];


constructor(private exchangeRatesService : ExchangeRatesService)
{

}


public lineChartData: ChartDataSets[];


  ngOnInit() {


    for(let i=30; i>0; i--){
      var day=new Date(this.year, this.month - 1, this.date - i);
      this.dates.push(day.getDate());
    }

    this.exchangeRatesService.getExchangeRateForLastMonth(this.primaryCurrency,this.secondaryCurrency,this.vendorValue).subscribe(
      (response) =>
      {
           //this.currencyArray = response;
      },
      (error) => {

      }
     );

    this.lineChartData= [
      { data: this.currencyArray,
        label: 'Rate' },
    ];
    this.lineChartLabels = this.dates;
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    var chartOrders = document.getElementById('chart-orders');

    this.amountToConvert

  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }


}
