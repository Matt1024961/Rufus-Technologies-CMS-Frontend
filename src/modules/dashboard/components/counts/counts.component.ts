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
import { UPDATE } from '@modules/dashboard/state/counts/actions';

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styleUrls: ['./counts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountsComponent implements OnInit, AfterViewInit {
  @ViewChild('graphParent', { static: true }) graphParentElement: ElementRef;
  @ViewChild('graphCanvas', { static: true }) graphElement: ElementRef;
  public graphData: any = {};
  public renderedChart: any;
  public resizeObservable: Observable<Event>;
  public resizeSubscription: Subscription;
  public graphObservable: Observable<any>;
  public chartObservable: Observable<ModuleInterface>;

  constructor(private store: Store<ModuleInterface>) {
    this.chartObservable = store.select((states) => {
      return states['dashboard']['counts'];
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
    this.graphData = graphData;
    if (this.renderedChart) {
      this.renderedChart.destroy();
    }
    const ctx = this.graphElement.nativeElement;

    ctx.height = this.graphParentElement.nativeElement.offsetHeight;
    ctx.width = this.graphParentElement.nativeElement.offsetWidth;

    const backgroundColors = [
      // update these based on the theme
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      // "rgba(255, 206, 86, 0.2)",
      // "rgba(75, 192, 192, 0.2)",
      // "rgba(153, 102, 255, 0.2)",
      // "rgba(255, 159, 64, 0.2)",
    ];

    const borderColors = [
      // update these based on the theme
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      // "rgba(255, 206, 86, 1)",
      // "rgba(75, 192, 192, 1)",
      // "rgba(153, 102, 255, 1)",
      // "rgba(255, 159, 64, 1)",
    ];

    const chartOptions = {
      type: 'doughnut',
      responsive: false,
      maintainAspectRatio: true,
      data: {
        datasets: [
          {
            data: [this.graphData.inline, this.graphData.regular],
            backgroundColor: [backgroundColors[0], backgroundColors[1]],
            hoverBackgroundColor: [borderColors[0], borderColors[1]],
            // label: 'Dataset 1'
          },
        ],
        labels: ['Inline Filings', 'Filings'],
      },
      options: {
        elements: {
          center: {
            text: `Total Filings: ${this.graphData.data}`,
            // color: "#FF6384", // Default is #000000
            fontStyle: 'Helvetica Neue sans-serif', // Default is Arial
            sidePadding: 20, // Default is 20 (as a percentage)
            minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 25, // Default is 25 (in px), used for when text wraps
          },
        },
        animation: {
          duration: drawGraphAgain ? 0 : 300,
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => {
              return data['labels'][tooltipItem[0]['index']];
            },
            label: (tooltipItem, data) => {
              return data['datasets'][0]['data'][tooltipItem['index']];
            },
          },
          titleFontSize: 16,
          bodyFontSize: 14,
          displayColors: false,
        },
      },
    };
    this.renderedChart = new Chart(ctx, chartOptions);
  }

  reloadContent() {
    if (this.renderedChart) {
      this.renderedChart.destroy();
    }
    this.store.dispatch({
      type: UPDATE,
    });
  }
}
