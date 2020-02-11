import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/dashboard/state/interface';
import { INIT, UPDATE } from '@modules/dashboard/state/pie-graph/actions';

@Component({
  selector: 'app-pie-graph',
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieGraphComponent implements OnInit, AfterViewInit {

  @ViewChild('graphParent', { static: true }) graphParentElement: ElementRef;
  @ViewChild('graphCanvas', { static: true }) graphElement: ElementRef;
  public graphData: any = [];
  public renderedChart: any;
  public resizeObservable: Observable<Event>;
  public resizeSubscription: Subscription;
  public graphObservable: Observable<any>;
  public chartObservable: Observable<ModuleInterface>;

  constructor(private store: Store<ModuleInterface>) {
    this.chartObservable = store.select(states => {
      return states['dashboard']['pie-graph'];
    });
  }

  ngOnInit() {
    this.store.dispatch({
      type: INIT
    });
  }

  ngAfterViewInit() {
    this.beginObserver();
  }

  beginObserver() {
    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable
      .pipe(debounceTime(300))
      .subscribe(evt => {
        this.drawGraph(true, this.graphData);
      });
    this.chartObservable.subscribe((options) => {
      if (options) {
        this.drawGraph(true, options);
      }
    });
  }

  drawGraph(drawGraphAgain = false, graphData) {
    this.graphData = Array.from(graphData);
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
    });

    const backgroundColorsArray = repeatArray(
      backgroundColors,
      this.graphData.length
    );

    const borderColorsArray = repeatArray(borderColors, this.graphData.length);

    const chartOptions = {
      type: 'pie',
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

  reloadContent() {
    if (this.renderedChart) {
      this.renderedChart.destroy();
    }
    this.store.dispatch({
      type: UPDATE
    });
  }
}
