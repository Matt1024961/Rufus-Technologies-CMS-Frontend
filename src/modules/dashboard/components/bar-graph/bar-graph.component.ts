import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarGraphComponent implements OnInit, AfterViewInit {

  @ViewChild('graphParent', { static: true }) graphParentElement: ElementRef;
  @ViewChild('graphCanvas', { static: true }) graphElement: ElementRef;
  public graphData: any = [];
  public renderedChart: any;
  public resizeObservable: Observable<Event>;
  public resizeSubscription: Subscription;
  public graphObservable: Observable<any>;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.beginObserver();
  }

  generateRandomGraphData(arrayLength) {
    const newArray = new Array(arrayLength);
    for (let i = 0; i < arrayLength; i++) {
      const min = 1;
      const max = 120;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      newArray[i] = {
        label: `Label ${i + 1}`,
        data: randomNumber
      };
    }
    return newArray;
  }

  beginObserver() {
    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable
      .pipe(debounceTime(300))
      .subscribe(evt => {
        this.drawGraph(true);
      });
    // the initial rendering of the graph
    this.drawGraph();
  }

  drawGraph(drawGraphAgain = false) {
    if (this.renderedChart) {
      this.renderedChart.destroy();
    }
    const ctx = this.graphElement.nativeElement;
    ctx.height = this.graphParentElement.nativeElement.offsetHeight;

    ctx.width = this.graphParentElement.nativeElement.offsetWidth;

    const backgroundColors = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ];

    const borderColors = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ];

    const min = 5;
    const max = 12;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    this.graphData = this.generateRandomGraphData(randomNumber);

    const repeatArray = (arr, times) => {
      return Array(times)
        .fill([...arr])
        .reduce((a, b) => a.concat(b));
    };

    const labelsOptionsArray = [];
    const dataArray = [];
    this.graphData.forEach(current => {
      labelsOptionsArray.push(current.label);
      dataArray.push(current.data);
      delete current.label;
    });

    const backgroundColorsArray = repeatArray(
      backgroundColors,
      this.graphData.length
    );

    const borderColorsArray = repeatArray(borderColors, this.graphData.length);

    const chartOptions = {
      type: 'bar',
      responsive: false,
      maintainAspectRatio: true,
      data: {
        labels: labelsOptionsArray,
        datasets: [
          {
            barPercentage: 0.5,
            label: 'Totally random',
            data: dataArray,
            backgroundColor: backgroundColorsArray,
            borderColor: borderColorsArray,
            borderWidth: 1
          }
        ]
      },
      options: {
        animation: {
          duration: drawGraphAgain ? 0 : 300
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: '# of the random'
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
    this.renderedChart = new Chart(ctx, chartOptions);
  }

}
