import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { PropertyService } from './../property.service';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Title } from '@angular/platform-browser';
import { SharedService } from '../../shared/shared.service';
import { AbstractControl, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import {
  emailRegex,
  objectToFormData,
  validateAllFormFields,
  stripePublishableKeyPattern,
  stripeSecretKeyPattern,
  phoneRegex,
} from 'src/app/main/shared/functions.component'
import { DocumentsNeeds } from '../../shared/documents-needs/documents-needs.component.api';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, of, Subject, Subscription } from "rxjs";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-owned-property',
  templateUrl: './owned-property.component.html',
  styleUrls: ['./owned-property.component.scss'],

})

export class OwnedPropertyComponent {
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  content = '';
  title = 'ck-text-editor';
 /**
  *
  */
  config = {
    toolbar: [
      { name: 'undo', groups: ['undo'], items: ['Undo', 'Redo'] },
      { name: 'basicstyles', groups: ['basicstyles'], items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
      { name: 'paragraph', groups: ['align', 'indent', 'list'], items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Outdent', 'Indent', '-', 'NumberedList', 'BulletedList'] },
      { name: 'styles', groups: ['font', 'colors'], items: ['Font', 'FontSize', '-', 'TextColor', 'BGColor'] },
      { name: 'links', items: ['Link', 'Unlink'] },
      { name: 'forms', items: ['Checkbox', 'Radio'] },
      { name: 'tools', items: ['Maximize'] }
    ],
    fontSize_sizes: '1/4px;2/6px;3/8px;4/10px;5/14px;6/20px;7/24px;',
    font_names:
      'Arial/Arial, Helvetica, sans-serif;' +
      'Times New Roman/Times New Roman, Times, serif;' +
      'Verdana/Verdana;' +
      'Open Sans/Open Sans;',
    fontSize_defaultLabel: '5',
    font_defaultLabel: 'Open Sans',
  };
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

  selection = new SelectionModel<any>(true, []);
  userDetails: any;

  @ViewChild('attachments') attachment: any;
  now: any = new Date();
  propertyForm!: FormGroup;
  rentForm!: FormGroup;
  photoForm!: FormGroup;
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background = 'primary';
  intended: any;
  rentDocumentsNeeds: BehaviorSubject<DocumentsNeeds> = new BehaviorSubject<DocumentsNeeds>(null!);
  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
  mainHeading: string = "Owned Property: ";
  subHeading: string = "1001 Bespin Loop, Apt D, Fort Myers, FL 33901";
  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Owned Property');
    this.userDetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.propertyFormInitialize();
    this.rentFormInitialize();
    this.loadRentDocumentsNeeds();
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
  propertyFormInitialize() {
    this.propertyForm = this.formBuilder.group({
      street_address: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', [Validators.required]),
      term: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      since_date: new FormControl(''),
      purchase_price: new FormControl(''),
      intended_id: new FormControl(''),
      llc_name: new FormControl(''),
      renewal_date: new FormControl(false),
      monthly_rent:new FormControl(''),
      current_date:new FormControl(''),
      createdate: [this.now, []],
      status: [true],
    })
  }
  rentFormInitialize() {
    this.rentForm = this.formBuilder.group({
      Monthly_rent: new FormControl('', [Validators.required]),
      term: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      since_date: new FormControl(''),
      renewal_date: new FormControl(''),
      current_date:new FormControl(''),
      desposit_paid:new FormControl(''),
      status: [true],
      pet_deposit_paid: new FormControl(''),
      on: new FormControl(''),
      rent_due: new FormControl(''),
      tennant: new FormControl(''),
      phone_number: new FormControl(''),
      email_address: new FormControl(''),
      tennat_notes: new FormControl(''),
    })
  }

  loadRentDocumentsNeeds() {
    let documentData: DocumentsNeeds = {
      modId: 5,
    }
    this.rentDocumentsNeeds.next(documentData);
  }
}


