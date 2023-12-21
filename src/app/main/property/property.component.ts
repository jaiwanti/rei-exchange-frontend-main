import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { PropertyService } from './property.service';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Title } from '@angular/platform-browser';
import { SharedService } from '../shared/shared.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize, first } from 'rxjs';

const ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent {
  displayedColumns: string[] = [
    'select',
    'alerts',
    'street_address',
    'city_and_state',
    'llc_name',
    'rents',
    'property_status',
    'insured',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  search = new FormControl('');
  totalRows = 0;
  pageSize = 10;
  params = {
    pageNumber: 1,
    paginate: 1,
    pageSize: 10,
    search: '',
    is_approved: 0,
    userId: 0,
  };
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  selection = new SelectionModel<any>(true, []);
  userDetails: any;
  
  constructor(
    private propertyService: PropertyService,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private titleService: Title,
  ) { }
  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.getPropertyDetailsByUserId();
    this.searchData();
    this.titleService.setTitle('Property Details');
  }
  getPropertyDetailsByUserId() {
    this.params.userId = this.userDetails.userId;
    this.sharedService.getPropertyDetailsByUserId(this.params)
      .subscribe({
        next: (res: any) => {
          res.data.map((element: any) => {
            element.select = false;
          })
          this.dataSource = res.data;
          this.totalRows = res.totalCount;
        },
        error: (error: any) => {
          this.toastr.error(error.message, 'Error');
        },
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1
      }`;
  }

  changeStatus(event: MatSlideToggleChange, element: any) {
    element.status = event.checked;
    // this.updateUser(element);
  }

  // updateUser(payload: any) {
  //   this.userService.updateUser(payload)
  //     .subscribe({
  //       next: (res: any) => {
  //         if (payload.status) {
  //           this.toastr.success('User has been Active successfully!', 'Success');
  //         }
  //         else {
  //           this.toastr.warning('User has been In-Active successfully!', 'Warning');
  //         }
  //       },
  //       error: (error: any) => {
  //         this.toastr.error(error.message, 'Error');
  //       },
  //     });
  // }

  masterToggle() {

  }
  pageChanged(event: PageEvent) {
    this.params.pageSize = event.pageSize;
    this.params.pageNumber = event.pageIndex + 1;
    this.getPropertyDetailsByUserId();
  }

  searchData() {
    this.search.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe({
        next: res => {
          this.params.search = res ? res : '';
          this.getPropertyDetailsByUserId();
        },
        error: error => {
          this.toastr.error(error.message, 'Error');
        },
      });
  }
}
