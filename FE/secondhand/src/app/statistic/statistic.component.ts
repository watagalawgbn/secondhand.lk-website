import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css'
})
export class StatisticComponent {

  public barChart: any;
  public pieChart: any;
  public piechartrating: any;
  public chartAds: any;

  private category: any[] = [];
  private count: any[] = [];

  data: any[] = [
    { category: "vehicle", count: 10 },
    { category: "property", count: 10 },
    { category: "electronics", count: 15 },
    { category: "home appliences", count: 20 },
    { category: "furniture and home deco", count: 25 },
    { category: "sports ", count: 25 },
    { category: "animals", count: 15 },
    { category: "other", count: 15 },


  ];

  createArrays(): void {
    for (let i = 0; i < this.data.length; i++) {
      this.category.push(this.data[i].category);
      this.count.push(this.data[i].count);
    }
  }

  createBarChart() {

    this.barChart = new Chart("MyChart", {
      type: 'bar', // type of chart

      data: {
        labels: this.category,
        datasets: [
          {
            label: "Advertisement by category",
            data: this.count,
            backgroundColor: '#9174FF'
          },
        ]
      },
      options: {
        aspectRatio: 0.8
      }

    });
  }

  createPieChart() {
    this.pieChart = new Chart("PieChart", {
      type: 'doughnut',
      data: {
        labels: [
          "reject ad",
          "accept ad"

        ],
        datasets: [{
          label: "AD count",
          data: [300, 450],
          backgroundColor: [
            '#DB3E3E',
            '#43F7C1',

          ],
          hoverOffset: 5,
          weight: 10
        }]
      }
    })
  }
  createPieChartrating() {
    this.piechartrating = new Chart("PieChartrating", {
      type: 'doughnut',
      data: {
        labels: [
          "0 star",
          "1 star",
          "2 star",
          "3 star",
          "4 star",
          "5 star"
        ],
        datasets: [{
          label: "user ratings",
          data: [10, 50, 30, 40, 15, 25],
          backgroundColor: [
            '#1BC8FF',
            '#FCFF6E',
            '#43F7C1',
            '#FFC56D',
            '#9174FF',
            '#FF79DA',

          ],
          hoverOffset: 10,
          weight: 20
        }]
      }
    })
  }

  createChartAds() {
    this.chartAds = new Chart("ChartAds", {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [{
          label: 'Advertisements on platform',
          data: [0, 15, 20, 30, 40, 25, 60, 50, 20, 30, 40, 30],
          fill: false,
          borderColor: '#FFC56D',
          tension: 0.1,
        }]
      },
      options: {
        aspectRatio: 0.8
      }
    })
  }

  ngOnInit(): void {
    this.createArrays();
    this.createBarChart();
    this.createPieChart();
    this.createPieChartrating();
    this.createChartAds();
  }
}
