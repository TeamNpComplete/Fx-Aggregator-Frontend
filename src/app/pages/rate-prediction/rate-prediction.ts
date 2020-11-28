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
  previousPredictedData = []
  currencies: string[] = appConfiguration.predictionSupportedCurrencies;
  currencyMapData = appConfiguration.predictionCurrencyMap;
  noOfDays = 35;
  noOfActualDays = 10;
  minDay;
  maxDay;
  predCurrenyPrev: string = null;
  daysPredict = [5,10];
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

    this.predictionService.getPreviousPredictionRate("INR").subscribe(
      (response) =>
      {
        PredictionService.previousPredictedDataSecondary = response;



      },
      (error) => {
        console.log(error);
      }
    );
    PredictionService.previousPredictedDataPrimary = "USD";
  }
  ngOnInit(): void {

  }
  getMinAxis() {

    var min = Number.MAX_VALUE;
    for (let i = 0; i < this.noOfDays; i++) {
      if (i < this.noOfDays - this.noOfActualDays)
      min = Math.min(min, this.actualData[i][1]);
     // min = Math.min(min, this.predictedData[i][1]);


    }
    console.log(min);
    return min;
  }

  getMaxAxis() {

    var max = 0;
    for (let i = 0; i < this.noOfDays; i++) {
      if (i < this.noOfDays - this.noOfActualDays)
        max = Math.max(max, this.actualData[i][1]);
      //max = Math.max(max, this.predictedData[i][1]);

    }

    return max;

  }

  public initChartData(): void {

    var minVal = this.getMinAxis();
    var maxVal = this.getMaxAxis();
    var range = maxVal - minVal;
    var mean = (maxVal + minVal)/2;
    var minLimit = minVal - 1.1 * range;
    var maxLimit = maxVal + 1.1 * range;
    this.series = [
      {
        name: "Predicted",
        data: this.predictedData
      },

      {
        name: "Actual",
        data: this.actualData
      },

      {
        name: "Previous Data",
        data: this.previousPredictedData

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

      min: minLimit,
      max: maxLimit,
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
    var prevDate = new Date(new Date().setDate(new Date().getDate() - 25));
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

  addDate(predicteddataArray: any[], actualdataArray: any[]) {
    this.predictedData = [];
    this.actualData = [];
    var prevDate = new Date(new Date().setDate(new Date().getDate() - 25));
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

  addDatePred(predicteddataArray: any[] , noOfDay: number) {
    this.previousPredictedData = [];
    var prevDate = new Date(new Date().setDate(new Date().getDate() - 25));
  for (let i = 0; i < noOfDay; i++) {
      var epochDate = new Date(prevDate.setDate(prevDate.getDate() + 1)).getTime();
      this.previousPredictedData.push([epochDate, predicteddataArray[i]]);
    }
  }

  primaryCurrencyValue(value) {
    var primaryCurrencyVal = this.currencyMapData.get(value);
    var secondaryCurrencyVal = this.currencyMapData.get(this.secondaryCurrencyPred);
    this.predCurrenyPrev = null;
    this.previousPredictedData = [];
    if(primaryCurrencyVal != 'USD')
    {
      this.predictionService.getPreviousPredictionRate(primaryCurrencyVal).subscribe(
        (response) =>
        {
          PredictionService.previousPredictedDataPrimary = response;

        },
        (error) => {
          console.log(error);
        }
      );
    }
    else{
      PredictionService.previousPredictedDataPrimary = "USD";
    }
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
    this.predCurrenyPrev = null;
    this.previousPredictedData = [];

    if(secondaryCurrencyVal != 'USD')
    {
      this.predictionService.getPreviousPredictionRate(secondaryCurrencyVal).subscribe(
        (response) =>
        {
          PredictionService.previousPredictedDataSecondary = response;

        },
        (error) => {
          console.log(error);
        }
      );
    }
    else
    {
      PredictionService.previousPredictedDataSecondary = "USD";
    }

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

  previousPredictionValue(value)
  {
      var prevDataPrimary =  PredictionService.previousPredictedDataPrimary;
      var prevDataSecondary = PredictionService.previousPredictedDataSecondary;
      var prevData = [];
      var prevData2 = [];
      var prevArray = [];
      switch(value)
      {
        case 1:
          if(prevDataPrimary == "USD")
          {
            prevData = prevDataSecondary["rates"];
            for(let i =0;i<prevData.length;i++)
            {
                var data = prevData[i]["rate"][0];
                prevArray.push(data);
            }
          }
          else if(prevDataSecondary == "USD")
          {
              prevData = prevDataPrimary["rates"];
              for(let i =0;i<prevData.length;i++)
              {
                  var data = prevData[i]["rate"][0];
                  prevArray.push(1/data);
              }
          }
          else
          {
            prevData = prevDataPrimary["rates"];
            prevData2 = prevDataSecondary["rates"];
            console.log(prevData);
            console.log(prevData2);
            for(let i =0;i<prevData.length;i++)
            {
                var data1 = prevData[i]["rate"][0];
                var data2 = prevData2[i]["rate"][0];
                console.log("Please help");
                console.log(data1);
                console.log(data2);
                prevArray.push(data2/data1);
            }

          }
          this.addDatePred(prevArray,25);

          console.log("In 1");
          break;
        case 3:
          if(prevDataPrimary == "USD")
          {
            prevData = prevDataSecondary["rates"];
            for(let i =0;i<prevData.length;i++)
            {
                var data = prevData[i]["rate"][2];
                prevArray.push(data);
            }
          }
          else if(prevDataSecondary == "USD")
          {
              prevData = prevDataPrimary["rates"];
              for(let i =0;i<prevData.length;i++)
              {
                  var data = prevData[i]["rate"][2];
                  prevArray.push(1/data);
              }
          }
          else
          {
            prevData = prevDataPrimary["rates"];
            prevData2 = prevDataSecondary["rates"];
            console.log(prevData);
            console.log(prevData2);
            for(let i =0;i<prevData.length;i++)
            {
                var data1 = prevData[i]["rate"][2];
                var data2 = prevData2[i]["rate"][2];
                console.log("Please help");
                console.log(data1);
                console.log(data2);
                prevArray.push(data2/data1);
            }

          }
          this.addDatePred(prevArray,25);

          console.log("In 1");
          break;
        case 5:

          if(prevDataPrimary == "USD")
          {
            prevData = prevDataSecondary["rates"];
            for(let i =0;i<prevData.length;i++)
            {
                var data = prevData[i]["rate"][4];
                prevArray.push(data);
            }
          }
          else if(prevDataSecondary == "USD")
          {
              prevData = prevDataPrimary["rates"];
              for(let i =0;i<prevData.length;i++)
              {
                  var data = prevData[i]["rate"][4];
                  prevArray.push(1/data);
              }
          }
          else
          {
            prevData = prevDataPrimary["rates"];
            prevData2 = prevDataSecondary["rates"];
            console.log(prevData);
            console.log(prevData2);
            for(let i =0;i<prevData.length;i++)
            {
                var data1 = prevData[i]["rate"][4];
                var data2 = prevData2[i]["rate"][4];
                console.log("Please help");
                console.log(data1);
                console.log(data2);
                prevArray.push(data2/data1);
            }

          }
          this.addDatePred(prevArray,25);

          console.log("In 1");
          break;
        case 7:

          if(prevDataPrimary == "USD")
          {
            prevData = prevDataSecondary["rates"];
            for(let i =0;i<prevData.length;i++)
            {
                var data = prevData[i]["rate"][6];
                prevArray.push(data);
            }
          }
          else if(prevDataSecondary == "USD")
          {
              prevData = prevDataPrimary["rates"];
              for(let i =0;i<prevData.length;i++)
              {
                  var data = prevData[i]["rate"][6];
                  prevArray.push(1/data);
              }
          }
          else
          {
            prevData = prevDataPrimary["rates"];
            prevData2 = prevDataSecondary["rates"];
            console.log(prevData);
            console.log(prevData2);
            for(let i =0;i<prevData.length;i++)
            {
                var data1 = prevData[i]["rate"][6];
                var data2 = prevData2[i]["rate"][6];
                console.log("Please help");
                console.log(data1);
                console.log(data2);
                prevArray.push(data2/data1);
            }

          }
          this.addDatePred(prevArray,25);

          console.log("In 1");
          break;
        case 10:
          if(prevDataPrimary == "USD")
          {
            prevData = prevDataSecondary["rates"];
            for(let i =0;i<prevData.length;i++)
            {
                var data = prevData[i]["rate"][9];
                prevArray.push(data);
            }
          }
          else if(prevDataSecondary == "USD")
          {
              prevData = prevDataPrimary["rates"];
              for(let i =0;i<prevData.length;i++)
              {
                  var data = prevData[i]["rate"][9];
                  prevArray.push(1/data);
              }
          }
          else
          {
            prevData = prevDataPrimary["rates"];
            prevData2 = prevDataSecondary["rates"];
            console.log(prevData);
            console.log(prevData2);
            for(let i =0;i<prevData.length;i++)
            {
                var data1 = prevData[i]["rate"][9];
                var data2 = prevData2[i]["rate"][9];
                console.log("Please help");
                console.log(data1);
                console.log(data2);
                prevArray.push(data2/data1);
            }

          }
          this.addDatePred(prevArray,25);

          console.log("In 1");
          break;
      }
      this.predictedData = [];
      console.log("hhhhhh");
      console.log(this.previousPredictedData);
      this.initChartData();
  }
}
