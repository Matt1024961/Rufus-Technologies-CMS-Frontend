import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import * as Chart from 'chart.js';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/user/state/interface';
import {
  UPDATE,
  CHANGE_LEVEL,
} from '@modules/dashboard/state/overview/actions';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent implements OnInit, AfterViewInit {
  @ViewChild('graphParent', { static: true }) graphParentElement: ElementRef;
  @ViewChild('graphCanvas', { static: true }) graphElement: ElementRef;
  public graphData: any = [];
  public renderedChart: any;
  public resizeObservable: Observable<Event>;
  public resizeSubscription: Subscription;
  public graphObservable: Observable<any>;
  public chartObservable: Observable<ModuleInterface>;
  public chartUserState = -1;
  public chartUserOptions = {};
  constructor(private store: Store<ModuleInterface>) {
    this.chartObservable = store.select((states) => {
      return states['dashboard']['overview'];
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.beginObserver();
  }

  beginObserver() {
    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable
      .pipe(debounceTime(300))
      .subscribe((evt) => {
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
      // update these based on the theme
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
    ];

    const borderColors = [
      // update these based on the theme
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
    ];

    const repeatArray = (arr, times) => {
      return Array(times)
        .fill([...arr])
        .reduce((a, b) => a.concat(b));
    };

    const labelsOptionsArray = [];
    const dataArray = [];
    const dataInlineArray = [];

    this.graphData.forEach((current) => {
      labelsOptionsArray.push(current.label);
      dataArray.push(current.regular);
      dataInlineArray.push(current.inline);
    });

    const chartOptions = {
      type: 'bar',
      responsive: false,
      maintainAspectRatio: true,
      data: {
        labels: labelsOptionsArray,
        datasets: [
          {
            barPercentage: 1.0,
            categoryPercentage: 0.8,
            minBarLength: 2,
            label: 'Inline Filings',
            data: dataInlineArray,
            backgroundColor: backgroundColors[0],
            borderColor: borderColors[0],
            hoverBackgroundColor: borderColors[0],
            hoverBorderColor: backgroundColors[0],
            borderWidth: 1,
          },
          {
            barPercentage: 1.0,
            categoryPercentage: 0.8,
            minBarLength: 2,
            label: 'Filings',
            data: dataArray,
            backgroundColor: backgroundColors[1],
            borderColor: borderColors[1],
            hoverBackgroundColor: borderColors[1],
            hoverBorderColor: backgroundColors[1],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: {
          duration: drawGraphAgain ? 0 : 300,
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Number of Filing(s) per year',
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => {
              let xLabel = tooltipItem[0]['xLabel'];
              const month = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ];
              if (this.chartUserState === 0) {
                xLabel = `${month[tooltipItem[0]['xLabel'] - 1]} ${
                  this.chartUserOptions['year']
                }`;
              }
              if (this.chartUserState === 1) {
                xLabel = `${month[this.chartUserOptions['month'] - 1]} ${
                  tooltipItem[0]['xLabel']
                } ${this.chartUserOptions['year']}`;
              }
              return `${
                data['datasets'][tooltipItem[0]['datasetIndex']]['label']
              } - ${xLabel}`;
            },
            label: (tooltipItem, data) => {
              return `${
                data['datasets'][tooltipItem['datasetIndex']]['data'][
                  tooltipItem['index']
                ]
              } records.`;
            },
            afterLabel: (tooltipItem, data) => {
              if (this.chartUserState < 1) {
                return 'Click to see more.';
              }
            },
          },
          titleFontSize: 16,
          bodyFontSize: 14,
          displayColors: false,
        },
        onClick: (event, items) => {
          if (this.chartUserState < 1) {
            const activeElement = this.renderedChart.getElementAtEvent(event);
            if (activeElement && activeElement[0]) {
              if (this.chartUserState === -1) {
                this.chartUserOptions['year'] =
                  activeElement[0]._model['label'];
                this.chartUserState = 0;
              } else if (this.chartUserState === 0) {
                this.chartUserOptions['month'] =
                  activeElement[0]._model['label'];
                this.chartUserState = 1;
              }
              this.store.dispatch({
                type: CHANGE_LEVEL,
                result: this.chartUserOptions,
              });
            }
          }
        },
      },
    };
    this.renderedChart = new Chart(ctx, chartOptions);
  }

  previousState() {
    this.chartUserState--;
    if (this.chartUserState === -1) {
      this.chartUserOptions = {};
    } else if (this.chartUserState === 0) {
      delete this.chartUserOptions['month'];
    }
    this.store.dispatch({
      type: CHANGE_LEVEL,
      result: this.chartUserOptions,
    });
  }

  reloadContent() {
    if (this.renderedChart) {
      this.renderedChart.destroy();
    }
    this.chartUserState = -1;
    this.chartUserOptions = {};
    this.store.dispatch({
      type: UPDATE,
    });
  }
}
