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
import { BehaviorSubject, Observable, of, Subject, Subscription } from "rxjs";
const ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})

export class AddPropertyComponent {
  @ViewChild('attachments') attachment: any;
  propertyForm!: FormGroup;
  lenderForm!: FormGroup;
  inspectionsForm!: FormGroup;
  insuranceForm!: FormGroup;
  closingForm!: FormGroup;
  isChecked = true;
  isLinear = false;
  now: any = new Date();
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
  base64File: any = null;
  filename: any = null;
  mainHeading: string = "Let's help you get this new investment going!";
  subHeading: string = "";
  intended: any;
  lenderDocumentsNeeds: BehaviorSubject<DocumentsNeeds> = new BehaviorSubject<DocumentsNeeds>(null!);
  inspectionsDocumentsNeeds: BehaviorSubject<DocumentsNeeds> = new BehaviorSubject<DocumentsNeeds>(null!);
  insuranceDocumentsNeeds: BehaviorSubject<DocumentsNeeds> = new BehaviorSubject<DocumentsNeeds>(null!);
  closingDocumentsNeeds: BehaviorSubject<DocumentsNeeds> = new BehaviorSubject<DocumentsNeeds>(null!);
  constructor(
    private propertyService: PropertyService,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private titleService: Title,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit() {
    var userDetails = JSON.parse(localStorage.getItem('user') || '{}');
    // this.getPropertyDetailsByUserId();
    this.titleService.setTitle('Add Property');
    this.propertyFormInitialize();
    this.lenderFormInitialize();
    this.inspectionsFormInitialize();
    this.insuranceFormInitialize();
    this.closingFormInitialize();
    this.getIntended();
    this.loadLenderDocumentsNeeds();
    this.loadInspectionsDocumentsNeeds();
    this.loadInsuranceDocumentsNeeds();
    this.loadClosingDocumentsNeeds();
  }

  propertyFormInitialize() {
    this.propertyForm = this.formBuilder.group({
      street_address: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      est_closing_date: new FormControl(''),
      purchase_price: new FormControl(''),
      intended_id: new FormControl(''),
      llc_name: new FormControl(''),
      is_cash_purchase: new FormControl(false),
      createdate: [this.now, []],
      status: [true],
    })
  }

  lenderFormInitialize() {
    this.lenderForm = this.formBuilder.group({
      institution_name: new FormControl(''),
      zip_code: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      officer_name: new FormControl(''),
      phone_number: ['', [Validators.pattern(phoneRegex)]],
      email_address: ['', [Validators.pattern(emailRegex)]],
      amount_financed: new FormControl(''),
      createdate: [this.now, []],
      status: [true],
    })
  }

  inspectionsFormInitialize() {
    this.inspectionsForm = this.formBuilder.group({
      inspection_name: new FormControl(''),
      zip_code: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      inspector_name: new FormControl(''),
      email_address: ['', [Validators.pattern(emailRegex)]],
      phone_number: ['', [Validators.pattern(phoneRegex)]],
      create_date: [this.now, []],
      status: [true],
    })
  }

  insuranceFormInitialize() {
    this.insuranceForm = this.formBuilder.group({
      agency_name: new FormControl(''),
      zip_code: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      agent_name: new FormControl(''),
      intended_id: new FormControl(''),
      email_address: ['', [Validators.pattern(emailRegex)]],
      phone_number: ['', [Validators.pattern(phoneRegex)]],
      create_date: [this.now, []],
      status: [true],
      gl: new FormControl(false),
      fire: new FormControl(false),
      wind: new FormControl(false),
      named_storm: new FormControl(false),
    })
  }

  closingFormInitialize() {
    this.closingForm = this.formBuilder.group({
      closing_date: new FormControl(''),
    })
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
  addToPortfolio() {
    this.toastr.success('Property added in your portfolio successfully!', 'Success');
  }
  masterToggle() {

  }

  onFileSelect(e: any): void {
    try {
      const file = e.target.files[0];
      const fReader = new FileReader()
      fReader.readAsDataURL(file)
      fReader.onloadend = (_event: any) => {
        this.filename = file.name;
        this.lenderForm.controls['re_appraisal'].setValue(file.name);
        this.base64File = _event.target.result;
      }
    } catch (error) {
      this.filename = null;
      this.base64File = null;
      console.log('no file was selected...');
    }
  }

  onStepChange(event: any) {
    switch (event.selectedIndex) {
      case 1:
        this.mainHeading = "Your Lending Info.";
        this.subHeading = "Don't have afinancing, yet? We can assist.";
        break;
      case 2:
        this.mainHeading = "Your Inspector's Info.";
        this.subHeading = "Don't have one? We can assist.";
        break;
      case 3:
        this.mainHeading = "Your Insurance Info.";
        this.subHeading = "Don't have an agency yet? We can assist.";
        break;
      case 4:
        this.mainHeading = "Your Closing Info.";
        this.subHeading = "";
        break;
      default:
        this.mainHeading = "Let's help you get this new investment going!";
        this.subHeading = "";
    }
  }

  getIntended() {
    this.propertyService.getIntended()
      .subscribe({
        next: (res: any) => {
          this.intended = res.data;
        },
        error: (error: any) => {
          this.toastr.error(error.message, 'Error');
        },
      });
  }
  loadLenderDocumentsNeeds() {
    let documentData: DocumentsNeeds = {
      modId: 1,
    }
    this.lenderDocumentsNeeds.next(documentData);
  }
  loadInspectionsDocumentsNeeds() {
    let documentData: DocumentsNeeds = {
      modId: 2,
    }
    this.inspectionsDocumentsNeeds.next(documentData);
  }
  loadInsuranceDocumentsNeeds() {
    let documentData: DocumentsNeeds = {
      modId: 3,
    }
    this.insuranceDocumentsNeeds.next(documentData);
  }
  loadClosingDocumentsNeeds() {
    let documentData: DocumentsNeeds = {
      modId: 4,
    }
    this.closingDocumentsNeeds.next(documentData);
  }
}
