import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { PropertyService } from './../property.service';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Title } from '@angular/platform-browser';
import { SharedService } from '../../shared/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
const ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent {
  isChecked = true;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  displayedColumns: string[] = [
    'select',
    'alerts',
    'street_address',
    'city_and_state',
    'llc_name',
    'rents',
    'property_status',
  ];
  totalRows = 0;
  pageSize = 10;
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  selection = new SelectionModel<any>(true, []);
  constructor(
    private propertyService: PropertyService,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private titleService: Title,
    private _formBuilder: FormBuilder,
  ) { }
  ngOnInit() {
    var userDetails = JSON.parse(localStorage.getItem('user') || '{}');
    // console.log('---userDetails---', userDetails);
    this.getPropertyDetailsByUserId();
    this.titleService.setTitle('Add Property');
  }
  getPropertyDetailsByUserId() {
    this.sharedService.getPropertyDetailsByUserId(88)
      .subscribe({
        next: (res: any) => {
          res.data.map((element: any) => {
            element.select = false;
          })
          this.dataSource = res.data;

          this.totalRows = res.data.length;
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
}
