import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { appConfiguration } from 'src/app/config/app.config';
import { ExchangeRatesService } from '../../services/exchange-rates.service';

import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit, AfterViewInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public currencyArray = [88.011, 88.011, 88.4825, 88.0795, 88.186, 88.186, 88.186, 88.066, 87.562, 87.6665, 87.638, 88.0085, 88.0085, 88.0085, 87.7405, 87.1955, 87.0695, 86.7555, 87.1115, 87.1115, 87.1115, 87.0865, 86.804, 87.1635, 87.5485, 87.3245, 87.3245, 87.3245, 87.112, 87.3745];

  primaryCurrency: String = 'USD';
  secondaryCurrency: String = 'INR';
  vendorValue: String = 'European Central Bank';

  primaryCurrencyGraph: String = null;
  secondaryCurrencyGraph: String = null;
  vendorValueGraph: String = null;
  primaryCurrency1: String = null;
  secondaryCurrency1: String = null;
  startDate: Date = null;
  endDate: Date = null;

  currencies: String[] = appConfiguration.supportedCurrencies;
  vendors: String[] = appConfiguration.supportedVendors;

  public copy: string;
  public lineChartLabels: Label[];

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

  public lineChartData: ChartDataSets[];

  constructor(private exchangeRatesService: ExchangeRatesService) {

  }
  ngOnInit() {

    this.primaryCurrencyGraph = "USD";
    for (let i = 30; i > 0; i--) {
      var day = new Date(this.year, this.month - 1, this.date - i);
      this.dates.push(day.getDate());
    }

    this.exchangeRatesService.getExchangeRateForLastMonth(this.primaryCurrency.split(' ')[0], this.secondaryCurrency.split(' ')[0], this.vendorValue).subscribe(
      (response: JSON[]) => {
        console.log(response);
        this.currencyArray = [];
        for (let obj of response) {
          this.currencyArray.push(obj["rate"]);
        }

        console.log(this.currencyArray);
        this.lineChartData = [
          {
            data: this.currencyArray,
            label: 'Rate'
          },
        ];
        this.lineChartLabels = this.dates;
      },
      (error) => {
        console.log(error);
      }
    );

    this.lineChartData = [
      {
        data: this.currencyArray,
        label: 'Rate'
      },
    ];
    this.lineChartLabels = this.dates;
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    var chartOrders = document.getElementById('chart-orders');
  }

  ngAfterViewInit() {

  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  public onCurrencyCodeChanged(codes) {
    this.primaryCurrency = codes['primary'];
    this.secondaryCurrency = codes['secondary'];
    this.primaryCurrencyGraph = codes['primary'];
    this.secondaryCurrencyGraph = codes['secondary'];
  }
}
