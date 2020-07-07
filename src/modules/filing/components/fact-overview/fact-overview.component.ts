import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import * as Chart from 'chart.js';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/filing/state/interface';
import { first } from 'rxjs/internal/operators/first';
import { debounceTime } from 'rxjs/operators';
import { ThemeService } from '@modules/user/services/theme/theme.service';

@Component({
  selector: 'app-fact-overview',
  templateUrl: './fact-overview.component.html',
  styleUrls: ['./fact-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FactOverviewComponent implements OnInit, AfterViewInit {
  @ViewChild('graphParent', { static: true }) graphParentElement: ElementRef;
  @ViewChild('graphCanvas', { static: true }) graphElement: ElementRef;

  public graphData: any = {};
  public renderedChart: any;
  public resizeObservable: Observable<Event>;
  public resizeSubscription: Subscription;
  public graphObservable: Observable<any>;
  public dataObservable: Observable<ModuleInterface>;
  public themeObservable: Observable<ModuleInterface>;
  public currentRowData: any;

  constructor(
    private store: Store<ModuleInterface>,
    public themeService: ThemeService
  ) {
    this.dataObservable = store.select((states) => {
      return states['filing']['datatable'];
    });
    this.themeObservable = store.select((states) => {
      return states['user']['theme'];
    });
  }

  ngOnInit(): void {
    this.dataObservable.pipe(first()).subscribe((firstValue) => {
      this.currentRowData = firstValue['data'].find(
        (current) => current.additional_view
      );
    });
  }
  ngAfterViewInit() {
    this.beginObserver();
    this.dataObservable.pipe(first()).subscribe((firstValue) => {
      this.currentRowData = firstValue['data'].find(
        (current) => current.additional_view
      );
      setTimeout(() => {
        this.drawGraph(true, this.currentRowData);
      }, 300);
    });
  }

  beginObserver() {
    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable
      .pipe(debounceTime(300))
      .subscribe((evt) => {
        this.drawGraph(true, this.currentRowData);
      });
    this.themeObservable.subscribe((data) => {
      if (this.renderedChart) {
        this.drawGraph(true);
      }
    });
  }

  drawGraph(drawGraphAgain = false, graphData: any = null) {
    if (graphData) {
      this.graphData = graphData.fact_overview;
    }

    if (this.renderedChart) {
      this.renderedChart.destroy();
    }
    const ctx = this.graphElement.nativeElement;

    ctx.height = this.graphParentElement.nativeElement.offsetHeight;
    ctx.width = this.graphParentElement.nativeElement.offsetWidth;
    const themeColors = this.themeService.getThemeColors();

    const labelsOptionsArray = [];
    const dataArray = [];
    const backgroundColorsArray = [];
    const dataInlineArray = [];

    this.graphData.forEach((current) => {
      labelsOptionsArray.push(current.type);
      dataArray.push(current.count);
    });

    const chartOptions: object = {
      type: 'doughnut',
      responsive: false,
      maintainAspectRatio: true,
      data: {
        datasets: [
          {
            data: dataArray,
            backgroundColor: themeColors.backgroundColors,
            borderColor: themeColors.backgroundColors,

            hoverBackgroundColor: themeColors.borderColors,
            // label: 'Dataset 1'
          },
        ],
        labels: labelsOptionsArray,
      },
      options: {
        elements: {
          center: {
            text: `Total Facts: ${Number(
              dataArray.reduce((a, b) => a + b, 0)
            ).toLocaleString('en-us')}`,
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
  isEmptyObject(input) {
    return input && Object.keys(input).length === 0;
  }
}
