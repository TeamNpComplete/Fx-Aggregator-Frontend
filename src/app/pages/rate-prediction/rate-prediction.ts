import { Component, OnInit, ViewChild } from "@angular/core";
import { PredictionService } from './../../services/prediction.service';


import { appConfiguration } from 'src/app/config/app.config'
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexTooltip,
  ApexYAxis,
  ApexFill
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  yaxis: ApexYAxis;
  fill: ApexFill;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-maps',
  templateUrl: './rate-prediction.component.html',
  styleUrls: ['./rate-prediction.scss']
})
export class MapsComponent implements OnInit {
  primaryCurrencyPred: string = "USD";
  secondaryCurrencyPred: string = "INR";
  predictedData = []
  actualData = []
  currencies: string[] = appConfiguration.supportedCurrencies;
  currencyMapData = appConfiguration.currencyMap;
  noOfDays = 40;
  noOfActualDays = 10;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private predictionService: PredictionService) {
    //console.log(this.currencyMapData.get("USD - United States dollar"));
    predictionService.getPredictionRate().subscribe(
      (response) => {
        //console.log("Responsive sent");
        PredictionService.data = response;
      },
      (error) => {
        console.log(error);
      }
    );

    predictionService.getActualRate().subscribe(
      (response) => {
        // console.log("Responsive sent");
        PredictionService.actualData = response;
      },
      (error) => {
        console.log(error);
      }
    );

    var prevDate = new Date(new Date().setDate(new Date().getDate() - 30));
    var predINRData = PredictionService.data['INR'];
    var actualINRData = PredictionService.actualData['INR'];
    for (let i = 0; i < this.noOfDays; i++) {
      var epochDate = new Date(prevDate.setDate(prevDate.getDate() + 1)).getTime();
      if (i < this.noOfDays - this.noOfActualDays) {
        this.predictedData.push([epochDate, predINRData[i]]);
        this.actualData.push([epochDate, actualINRData[i]]);
        //console.log(epochDate);
      }
      this.predictedData.push([epochDate, predINRData[i]]);
    }

    this.chartOptions = {
      series: [
        {
          name: "Predicted",
          data: this.predictedData
        },

        {
          name: "Actual",
          data: this.actualData
        }
      ],
      chart: {
        height: 350,
        type: "area",
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        type: "datetime"
      },
      tooltip: {
        shared: false
      },
      fill:
      {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      }
    };
  }
  ngOnInit(): void {

  }

  addDate(predicteddataArray: any[], actualdataArray: any[]) {
    this.predictedData = [];
    this.actualData = [];
    var prevDate = new Date(new Date().setDate(new Date().getDate() - 30));
    for (let i = 0; i < this.noOfDays; i++) {
      var epochDate = new Date(prevDate.setDate(prevDate.getDate() + 1)).getTime();
      if (i < this.noOfDays - this.noOfActualDays) {
        this.predictedData.push([epochDate, predicteddataArray[i]]);
        this.actualData.push([epochDate, actualdataArray[i]]);
        //console.log(epochDate);
      }
      this.predictedData.push([epochDate, predicteddataArray[i]]);
    }
  }

  primaryCurrencyValue(value) {
    var primaryCurrencyVal = this.currencyMapData.get(value);
    var secondaryCurrencyVal = this.secondaryCurrencyPred;
    if (primaryCurrencyVal == 'USD') {
      var predictedcurrencyData = PredictionService.data[secondaryCurrencyVal];
      var actualCurrencyData = PredictionService.actualData[secondaryCurrencyVal];
      this.addDate(predictedcurrencyData, actualCurrencyData);

    }
    else if (secondaryCurrencyVal == 'USD') {
      var predictedCurrencyData = PredictionService.data[primaryCurrencyVal];
      var actualCurrencyData = PredictionService.actualData[primaryCurrencyVal];
      for (let i = 0; i < this.noOfDays; i++) {
        predCalculatedData.push(1 / predictedCurrencyData[i]);
        if (i < this.noOfDays - this.noOfActualDays) {
          actualCalculatedData.push(1 / actualCurrencyData[i]);
        }
      }
      this.addDate(predictedCurrencyData, actualCurrencyData);
    }
    else {
      var predPrimaryCurrencyBase = PredictionService.data[primaryCurrencyVal];
      var predSecondaryCurrencyBase = PredictionService.data[secondaryCurrencyVal];
      var actualPrimaryCurrencyBase = PredictionService.actualData[primaryCurrencyVal];
      var actualSecondaryCurrencyBase = PredictionService.actualData[secondaryCurrencyVal];
      var actualCalculatedData = [];
      var predCalculatedData = [];
      for (let i = 0; i < this.noOfDays; i++) {
        predCalculatedData.push(predSecondaryCurrencyBase[i] / predPrimaryCurrencyBase[i]);
        if (i < this.noOfDays - this.noOfActualDays) {
          actualCalculatedData.push(actualSecondaryCurrencyBase[i] / actualPrimaryCurrencyBase[i]);
        }
      }
      this.addDate(predCalculatedData, actualCalculatedData);
    }
    this.chartOptions.series = [{
      name: "Predicted",
      data: this.predictedData
    },

    {
      name: "Actual",
      data: this.actualData
    }];

  }

  secondaryCurrencyValue(value) {
    var primaryCurrencyVal = this.primaryCurrencyPred;
    var secondaryCurrencyVal = this.currencyMapData.get(value);
    if (primaryCurrencyVal == 'USD') {
      var predictedcurrencyData = PredictionService.data[secondaryCurrencyVal];
      var actualCurrencyData = PredictionService.actualData[secondaryCurrencyVal];
      this.addDate(predictedcurrencyData, actualCurrencyData);

    }
    else if (secondaryCurrencyVal == 'USD') {
      var predictedCurrencyData = PredictionService.data[primaryCurrencyVal];
      var actualCurrencyData = PredictionService.actualData[primaryCurrencyVal];
      for (let i = 0; i < this.noOfDays; i++) {
        predCalculatedData.push(1 / predictedCurrencyData[i]);
        if (i < this.noOfDays - this.noOfActualDays) {
          actualCalculatedData.push(1 / actualCurrencyData[i]);
        }
      }
      this.addDate(predictedCurrencyData, actualCurrencyData);
    }
    else {
      var predPrimaryCurrencyBase = PredictionService.data[primaryCurrencyVal];
      var predSecondaryCurrencyBase = PredictionService.data[secondaryCurrencyVal];
      var actualPrimaryCurrencyBase = PredictionService.actualData[primaryCurrencyVal];
      var actualSecondaryCurrencyBase = PredictionService.actualData[secondaryCurrencyVal];
      var actualCalculatedData = [];
      var predCalculatedData = [];
      for (let i = 0; i < this.noOfDays; i++) {
        predCalculatedData.push(predSecondaryCurrencyBase[i] / predPrimaryCurrencyBase[i]);
        if (i < this.noOfDays - this.noOfActualDays) {
          actualCalculatedData.push(actualSecondaryCurrencyBase[i] / actualPrimaryCurrencyBase[i]);
        }
      }
      this.addDate(predCalculatedData, actualCalculatedData);
    }

    this.chartOptions.series = [{
      name: "Predicted",
      data: this.predictedData
    },

    {
      name: "Actual",
      data: this.actualData
    }];
  }
}
