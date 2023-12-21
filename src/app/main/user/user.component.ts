import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Title } from '@angular/platform-browser';
const ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  displayedColumns: string[] = [
    'first_name',
    'lastname',
    'phone_number',
    'email_address',
    'createdate',
    'usertype',
    'status',
  ];
  totalRows = 0;
  pageSize = 10;
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  selection = new SelectionModel<any>(true, []);
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private titleService: Title,
  ) { }
  ngOnInit() {
    this.getAllUsersWithType();
    this.titleService.setTitle('Sign up users');
  }
  getAllUsersWithType() {
    this.userService.getAllUsersWithType()
      .subscribe({
        next: (res: any) => {
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
    this.updateUser(element);
  }

  updateUser(payload: any) {
    this.userService.updateUser(payload)
      .subscribe({
        next: (res: any) => {
          if (payload.status) {
            this.toastr.success('User has been Active successfully!', 'Success');
          }
          else {
            this.toastr.warning('User has been In-Active successfully!', 'Warning');
          }
        },
        error: (error: any) => {
          this.toastr.error(error.message, 'Error');
        },
      });
  }
}
