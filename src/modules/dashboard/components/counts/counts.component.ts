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
import { ThemeService } from '@modules/user/services/theme/theme.service';

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styleUrls: ['./counts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountsComponent implements OnInit, AfterViewInit {
  @ViewChild('graphParent', { static: false }) graphParentElement: ElementRef;
  @ViewChild('graphCanvas', { static: false }) graphElement: ElementRef;
  public graphData: any = {};
  public renderedChart: any;
  public resizeObservable: Observable<Event>;
  public resizeSubscription: Subscription;
  public graphObservable: Observable<any>;
  public chartObservable: Observable<ModuleInterface>;
  public themeObservable: Observable<ModuleInterface>;

  constructor(
    private store: Store<ModuleInterface>,
    public themeService: ThemeService
  ) {
    this.chartObservable = store.select((states) => {
      return states['dashboard']['counts'];
    });
    this.themeObservable = store.select((states) => {
      return states['user']['theme'];
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
        setTimeout(() => {
          this.drawGraph(true, options);
        });
      }
    });
    this.themeObservable.subscribe((data) => {
      if (this.renderedChart) {
        this.drawGraph(true);
      }
    });
  }

  drawGraph(drawGraphAgain = false, graphData: any = null) {
    if (graphData) {
      this.graphData = graphData;
    }

    if (this.renderedChart) {
      this.renderedChart.destroy();
    }

    const ctx = this.graphElement.nativeElement;

    ctx.height = this.graphParentElement.nativeElement.offsetHeight;
    ctx.width = this.graphParentElement.nativeElement.offsetWidth;
    const themeColors = this.themeService.getThemeColors();

    const chartOptions: object = {
      type: 'doughnut',
      responsive: false,
      maintainAspectRatio: true,
      data: {
        datasets: [
          {
            data: [this.graphData.inline, this.graphData.regular],
            backgroundColor: [
              themeColors.backgroundColors[0],
              themeColors.backgroundColors[1],
            ],
            borderColor: [
              themeColors.backgroundColors[0],
              themeColors.backgroundColors[1],
            ],

            hoverBackgroundColor: [
              themeColors.borderColors[0],
              themeColors.borderColors[1],
            ],
          },
        ],
        labels: ['Inline Filings', 'Filings'],
      },
      options: {
        elements: {
          center: {
            text: `Total Filings: ${Number(this.graphData.data).toLocaleString(
              'en-us'
            )}`,
            color: themeColors.fontColor, // Default is #000000
            fontStyle: 'Helvetica Neue sans-serif', // Default is Arial
            sidePadding: 20, // Default is 20 (as a percentage)
            minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 25, // Default is 25 (in px), used for when text wraps
          },
        },
        legend: {
          labels: {
            fontColor: themeColors.fontColor,
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
              return Number(
                data['datasets'][0]['data'][tooltipItem['index']]
              ).toLocaleString('en-us');
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
