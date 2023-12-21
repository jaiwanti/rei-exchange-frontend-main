import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

const ELEMENT_DATA: any[] = [
  {
    alerts: '',
    id: 1,
    llc: 'Associate Holding LLC',
    address: '764 Adrean way',
    city: 'Tampa,FL',
    status: 'Rented',
    rents: 'Current',
    listed: '',
  },
  {
    alerts: '',
    id: 2,
    llc: 'Associate Holding LLC',
    address: '764 Adrean way',
    city: 'Tampa,FL',
    status: 'Rented',
    rents: 'Now Due',
    listed: '',
  },
  {
    alerts: '',
    id: 3,
    llc: 'Associate Holding LLC',
    address: '764 Adrean way',
    city: 'Tampa,FL',
    status: 'Vacant',
    rents: 'Current',
    listed: '',
  },
  {
    alerts: '',
    id: 4,
    llc: 'Associate Holding LLC',
    address: '764 Adrean way',
    city: 'Tampa,FL',
    status: 'Vacant',
    rents: 'Late',
    listed: '',
  },
  {
    alerts: '',
    id: 5,
    llc: 'Associate Holding LLC',
    address: '764 Adrean way',
    city: 'Tampa,FL',
    status: 'Vacant',
    rents: 'Current',
    listed: '',
  },
  {
    alerts: '',
    id: 6,
    llc: 'Associate Holding LLC',
    address: '764 Adrean way',
    city: 'Tampa,FL',
    status: 'Rented',
    rents: 'Now Due',
    listed: '',
  },
  {
    alerts: '',
    id: 6,
    llc: 'Associate Holding LLC',
    address: '764 Adrean way',
    city: 'Tampa,FL',
    status: 'In Renovation',
    rents: 'Late',
    listed: '',
  },
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  displayedColumns: string[] = [
    'select',
    'alerts',
    'llc',
    'address',
    'city',
    'status',
    'rents',
    'listed',
  ];

  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  selection = new SelectionModel<any>(true, []);

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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}
