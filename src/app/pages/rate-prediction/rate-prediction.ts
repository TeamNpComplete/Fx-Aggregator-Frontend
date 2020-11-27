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
  ApexFill,
  ApexMarkers,
  ApexAnnotations
} from "ng-apexcharts";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";


// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   dataLabels: ApexDataLabels;
//   markers: ApexMarkers;
//   title: ApexTitleSubtitle;
//   fill: ApexFill;
//   yaxis: ApexYAxis;
//   xaxis: ApexXAxis;
//   tooltip: ApexTooltip;
//   stroke: ApexStroke;
//   annotations: ApexAnnotations;
//   colors: any;
//   toolbar: any;
// };

@Component({
  selector: 'app-maps',
  templateUrl: './rate-prediction.component.html',
  styleUrls: ['./rate-prediction.scss']
})
export class MapsComponent implements OnInit {
  primaryCurrencyPred: string = "USD - United States dollar";
  secondaryCurrencyPred: string = "INR - Indian rupee";
  predictedData = []
  actualData = []
  currencies: string[] = appConfiguration.supportedCurrencies;
  currencyMapData = appConfiguration.currencyMap;
  noOfDays = 40;
  noOfActualDays = 10;
  minDay;
  maxDay;
  // @ViewChild("chart") chart: ChartComponent;
  //public chartOptions: Partial<ChartOptions>;
  public series: ApexAxisChartSeries;
  public chart: ApexChart;
  public dataLabels: ApexDataLabels;
  public markers: ApexMarkers;
  public title: ApexTitleSubtitle;
  public fill: ApexFill;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public tooltip: ApexTooltip;

  constructor(private predictionService: PredictionService) {
    //console.log(this.currencyMapData.get("USD - United States dollar"));
    predictionService.getPredictionRate().subscribe(
      (response) => {
        //console.log("Responsive sent");
        PredictionService.data = response;
        predictionService.getActualRate().subscribe(
          (response) => {
            // console.log("Responsive sent");
            PredictionService.actualData = response;
            this.mapInit();
            this.initChartData();
            // this.setMapData();
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );




  }
  ngOnInit(): void {

  }
  getMinAxis() {
    //console.log(this.predictedData[1][0]);

    //console.log(this.predictedData);
    var min = Number.MAX_VALUE;
    for (let i = 0; i < this.noOfDays; i++) {
      if (i < this.noOfDays - this.noOfActualDays)
        min = Math.min(min, this.actualData[i][1]);
      min = Math.min(min, this.predictedData[i][1]);
     // console.log("lol");

    }
    min = Math.floor(min / 10) * 10
    console.log(min);
    return min;
  }

  getMaxAxis() {
    var minVal = this.getMinAxis();
    //console.log(minVal);
    var max = 0;
    for (let i = 0; i < this.noOfDays; i++) {
      if (i < this.noOfDays - this.noOfActualDays)
        max = Math.max(max, this.actualData[i][1]);
      max = Math.max(max, this.predictedData[i][1]);

    }
    max = Math.round(max / 10) * 10
    console.log(max);
    return Math.max(minVal + 15, max);

  }

  public initChartData(): void {


    this.series = [
      {
        name: "Predicted",
        data: this.predictedData
      },

      {
        name: "Actual",
        data: this.actualData
      }
    ];
    this.chart = {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      }
    };
    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      size: 0
    };

    this.fill = {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    };
    this.yaxis = {

      // min: this.getMinAxis(),
      // max: this.getMaxAxis(),
      forceNiceScale: true,
      labels: {
        formatter: function (val) {
          return (val).toFixed(2);
        }
      },
      title: {
        text: "Price"
      }
    };
    this.xaxis = {
      type: "datetime"
    };
    this.tooltip = {
      x: {
        show: true
      },
      y: {

        formatter: function (val) {
          return (val).toFixed(2);
        }
      }
    };
  }
  mapInit() {
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
  }
  // setMapData(){
  //   this.chartOptions = {
  //     series: [
  //       {
  //         name: "Predicted",
  //         data: this.predictedData
  //       },

  //       {
  //         name: "Actual",
  //         data: this.actualData
  //       }
  //     ],
  //     chart: {
  //       height: 350,
  //       type: "area",
  //       zoom: {
  //         type: "x",
  //         enabled: true,
  //         autoScaleYaxis: true
  //       },
  //       toolbar: {
  //         autoSelected: "zoom"
  //       }
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     stroke: {
  //       curve: "straight"
  //     },
  //     title: {
  //       text: "",
  //       align: "left"
  //     },
  //     grid: {
  //       row: {
  //         colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
  //         opacity: 0.5
  //       }
  //     },
  //     xaxis: {
  //       type: "datetime"
  //     },
  //     yaxis: {

  //       labels: {
  //         formatter: function (value) {
  //           return value.toFixed(2);
  //         }
  //       },
  //     },
  //     tooltip: {
  //       shared: false
  //     },
  //     fill:
  //     {
  //       type: "gradient",
  //       gradient: {
  //         shadeIntensity: 1,
  //         inverseColors: false,
  //         opacityFrom: 0.5,
  //         opacityTo: 0,
  //         stops: [0, 90, 100]
  //       }
  //     }
  //   };
  // }

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
    var secondaryCurrencyVal = this.currencyMapData.get(this.secondaryCurrencyPred);
    if (primaryCurrencyVal == 'USD') {
      var predictedcurrencyData = PredictionService.data[secondaryCurrencyVal];
      var actualCurrencyData = PredictionService.actualData[secondaryCurrencyVal];
      this.addDate(predictedcurrencyData, actualCurrencyData);

    }
    else if (secondaryCurrencyVal == 'USD') {
      var predictedCurrencyData = PredictionService.data[primaryCurrencyVal];
      var actualCurrencyData = PredictionService.actualData[primaryCurrencyVal];
      var actualCalculatedData = [];
      var predCalculatedData = [];
      for (let i = 0; i < this.noOfDays; i++) {
        predCalculatedData.push(1 / predictedCurrencyData[i]);
        if (i < this.noOfDays - this.noOfActualDays) {
          actualCalculatedData.push(1 / actualCurrencyData[i]);
        }
      }
      this.addDate(predCalculatedData, actualCalculatedData);
    }
    else {
      var predPrimaryCurrencyBase = PredictionService.data[primaryCurrencyVal];
      console.log(primaryCurrencyVal);
      console.log(predPrimaryCurrencyBase);
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
    //this.setMapData();
    this.initChartData();


  }

  secondaryCurrencyValue(value) {
    var primaryCurrencyVal = this.currencyMapData.get(this.primaryCurrencyPred);
    var secondaryCurrencyVal = this.currencyMapData.get(value);
    console.log("lol");
    console.log(value);

    console.log(secondaryCurrencyVal);
    if (primaryCurrencyVal == 'USD') {
      var predictedCurrencyData = PredictionService.data[secondaryCurrencyVal];
      var actualCurrencyData = PredictionService.actualData[secondaryCurrencyVal];
      console.log(predictedCurrencyData);
      this.addDate(predictedCurrencyData, actualCurrencyData);

    }
    else if (secondaryCurrencyVal == 'USD') {
      var predictedCurrencyData = PredictionService.data[primaryCurrencyVal];
      var actualCurrencyData = PredictionService.actualData[primaryCurrencyVal];
      var actualCalculatedData = [];
      var predCalculatedData = [];
      for (let i = 0; i < this.noOfDays; i++) {
        predCalculatedData.push(1 / predictedCurrencyData[i]);
        if (i < this.noOfDays - this.noOfActualDays) {
          actualCalculatedData.push(1 / actualCurrencyData[i]);
        }
      }

      this.addDate(predCalculatedData, actualCalculatedData);
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
    //this.setMapData();
    this.initChartData();


  }
}
