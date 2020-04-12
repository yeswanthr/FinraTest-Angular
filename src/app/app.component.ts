import {Component} from '@angular/core';
import {GridServiceService} from './grid-service.service';
import {LazyLoadEvent} from 'primeng/api/public_api';
import {MessageService} from 'primeng/api';
import {timer} from 'rxjs';
import {PageAttributes} from '../models/PageAttributes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'Finra-Test';
  cars: any[];

  cols: any[];

  first = 0;

  rows = 10;

  loading: boolean;

  datasource: any = [];

  totalRecords: number;

  property: string = '';

  isLoading = false;

  rowsPerPage: number;

  constructor(private service: GridServiceService, private messageService: MessageService) {
  }

  ngOnInit() {

    this.cols = [
      {field: 'column', header: 'Combinations'}
    ];
  }

  checkGridId() {
    const numbers = /^[0-9]+$/;
    if (this.property &&
      (this.property.length === 7 || this.property.length === 10) &&
      numbers.test(this.property)) {
    this.isLoading = true;
    this.service.getInitialData(this.property).subscribe(resp => {
          this.loadData(resp);
        },
        error => {
          this.cars = [];
          this.messageService.add({severity: 'warn', summary: 'Validation Failed', detail: error.error.details});
          this.isLoading = false;
        });
    } else {
      this.cars = [];
      if (!numbers.test(this.property)) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Validation Failed',
          detail: 'Please enter Numerical Values'
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Validation Failed',
          detail: 'Please enter 7 or 10 digit numbers'
        });
      }
    }
  }

  loadData(result) {
    this.totalRecords = result.totalNumberOfItems;
    this.rowsPerPage = result.itemsPerPage;
    this.loadCarsLazy(1);
    this.isLoading = false;
  }

  loadCarsLazy(pageIndex?: number | string, event?: LazyLoadEvent) {
    this.loading = true;
    const index = pageIndex ? pageIndex : (event.first / this.rowsPerPage) + 1;
    this.service.getGridData(index).subscribe(records => {
      this.cars = [];
      const data1: string[] = records['data'];
      data1.map(item => this.cars.push({column: item}));
      this.loading = false;
    });
  }
}
