import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { NewSignUpService } from './new-signup.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AbstractControl, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { emailRegex, phoneRegex } from 'src/app/main/shared/functions.component'
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserService } from '../user/user.service';
import { SharedService } from '../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

const ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-new-signup',
  templateUrl: './new-signup.component.html',
  styleUrls: ['./new-signup.component.scss']
})
export class NewSignupComponent {
  hide: boolean = true;
  newSignUpForm!: FormGroup;
  LLCsForm!: FormGroup;
  lendingInstitutionForm!: FormGroup;
  insuranceAgencyForm!: FormGroup;
  propertyDetailsForm!: FormGroup;
  now: any = new Date();
  selection = new SelectionModel<any>(true, []);
  nextStep: number = 0;
  mainHeading: string = 'Your Name & Contact Info:';
  subHeading: string = '';
  signupSubHeading: string = 'creating your investor profile';
  occupancy_type: any;
  llcs_list: any = [];
  insurance_agency_list: any = [];
  lending_institution_list: any = [];
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  isContinueToNext: boolean = false;
  loginUserDetails: any;
  constructor(
    private newSignUpService: NewSignUpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private titleService: Title,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.newSignUpFormInitialize();
    this.LLCsFormInitialize();
    this.lendingInstitutionFormInitialize();
    this.insuranceAgencyFormInitialize();
    this.propertyDetailsFormInitialize();
    this.titleService.setTitle('Investor Sign up');
    this.getAllOccupancyType();
  }

  newSignUpFormInitialize() {
    this.newSignUpForm = this.formBuilder.group({
      first_name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email_address: ['', [Validators.required, Validators.pattern(emailRegex)]],
      phone_number: ['', [Validators.required, Validators.pattern(phoneRegex)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      usertypeid: [4, []],
      createdate: [this.now, []],
      status: [true],
    }, { validators: this.validateAreEqual })
  }

  validateAreEqual(c: AbstractControl): { notSame: boolean } | null {
    return c.value.password === c.value.confirm_password ? null : { notSame: true };
  }

  LLCsFormInitialize() {
    this.LLCsForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      userid: new FormControl(this.loginUserDetails?.userId),
      create_date: [this.now, []],
      status: [true],
    })
  }

  lendingInstitutionFormInitialize() {
    this.lendingInstitutionForm = this.formBuilder.group({
      id: new FormControl(0),
      institution_name: new FormControl('', [Validators.required]),
      officer_name: new FormControl(''),
      email_address: ['', [Validators.pattern(emailRegex)]],
      phone_number: ['', [Validators.pattern(phoneRegex)]],
      userid: [this.loginUserDetails?.userId],
      create_date: [this.now, []],
      status: [true],
    })
  }

  insuranceAgencyFormInitialize() {
    this.insuranceAgencyForm = this.formBuilder.group({
      id: new FormControl(0),
      agency_name: new FormControl('', [Validators.required]),
      agent_name: new FormControl(''),
      email_address: ['', [Validators.pattern(emailRegex)]],
      phone_number: ['', [Validators.pattern(phoneRegex)]],
      userid: [this.loginUserDetails?.userId],
      create_date: [this.now],
      status: [true],
    })
  }

  propertyDetailsFormInitialize() {
    this.propertyDetailsForm = this.formBuilder.group({
      id: new FormControl(0),
      userid: new FormControl(this.loginUserDetails?.userId, [Validators.required]),
      street_address: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', [Validators.required]),
      // city_id: new FormControl(null),
      // state_id: new FormControl(null),
      occupancy_type_id: new FormControl('', [Validators.required]),
      no_of_units: new FormControl('', [Validators.required]),
      llc_id: new FormControl(''),
      insurance_agency_id: ['', [Validators.required]],
      lending_institution_id: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      isCurrentlyInsured: [false],
      isWasItFinanced: [false],
      create_date: [this.now, []],
      status: [true],
      gl: [false],
      fire: [false],
      wind: [false],
      named_storm: [false],
    })
  }
  // getAllUsersWithType() {
  //   this.newSignUpService.getAllUsersWithType()
  //     .subscribe({
  //       next: (res: any) => {
  //         this.dataSource = res.data;
  //         this.totalRows = res.data.length;
  //       },
  //       error: (error: any) => {
  //         this.toastr.error(error.message, 'Error');
  //       },
  //     });
  // }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // toggleAllRows() {
  //   if (this.isAllSelected()) {
  //     this.selection.clear();
  //     return;
  //   }

  //   this.selection.select(...this.dataSource.data);
  // }

  // checkboxLabel(row?: any): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1
  //     }`;
  // }

  changeStatus(event: MatSlideToggleChange, element: any) {
    element.status = event.checked;
    this.updateUser(element);
  }

  updateUser(payload: any) {
    this.newSignUpService.updateUser(payload)
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

  getAllOccupancyType() {
    this.newSignUpService.getAllOccupancyType()
      .subscribe({
        next: (res: any) => {
          this.occupancy_type = res.data;
        },
        error: (error: any) => {
          this.toastr.error(error.message, 'Error');
        },
      });
  }

  getLLCsByUserId(userid: number) {
    this.sharedService.getLLCsByUserId(userid)
      .subscribe({
        next: (res: any) => {
          this.llcs_list = res.data;
        },
        error: (error: any) => {
          this.toastr.error(error.message, 'Error');
        },
      });
  }

  getLendingInstitutionByUserId(userid: number) {
    this.sharedService.getLendingInstitutionByUserId(userid)
      .subscribe({
        next: (res: any) => {
          this.lending_institution_list = res.data;
        },
        error: (error: any) => {
          this.toastr.error(error.message, 'Error');
        },
      });
  }

  getInsuranceAgencyByUserId(userid: number) {
    this.sharedService.getInsuranceAgencyByUserId(userid)
      .subscribe({
        next: (res: any) => {
          this.insurance_agency_list = res.data;
        },
        error: (error: any) => {
          this.toastr.error(error.message, 'Error');
        },
      });
  }

  newUserLogin() {
    this.authenticationService.userLogin({ password: this.newSignUpForm.value.password, email: this.newSignUpForm.value.email_address })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', JSON.stringify(res.data.token));
          localStorage.setItem('user', JSON.stringify(res.data));
          this.loginUserDetails = JSON.parse(localStorage.getItem('user') || '{}');
          this.userService.setUserDetails(res);
        },
        error: (error: any) => {
          if (error?.message) {
            this.toastr.error(error.error.message, 'Error');
          }
          else {
            this.toastr.error('Invalid email or password!', 'Error');
          }
        },
      });
  }

  createNewUser() {
    let payload = this.newSignUpForm.value;
    this.authenticationService.addUser(payload)
      .subscribe({
        next: (res: any) => {
          if (res.data) {
            this.newUserLogin();
            this.isContinueToNext = true;
            this.continue();
            this.toastr.success('Your user has been created!', 'Success');
          }

        },
        error: (error: any) => {
          this.toastr.error(error.error.message, 'Error');
        },
      });
  }

  continue(skip?: boolean) {
    if (this.nextStep == 0 && this.isContinueToNext == false) {
      this.createNewUser();
    }
    else if (this.nextStep == 1 && this.isContinueToNext == false) {
      if (this.LLCsForm.valid) {
        this.addUserLLCs(true);
      }
      else {
        this.isContinueToNext = true;
      }
    }
    else if (this.nextStep == 2 && this.isContinueToNext == false) {
      if (skip) {
        this.isContinueToNext = true;
      }
      else {
        this.addUserLendingInstitution(true);
      }
    }
    else if (this.nextStep == 3 && this.isContinueToNext == false) {
      if (skip) {
        this.isContinueToNext = true;
      }
      else {
        this.addUserInsuranceAgency(true);
      }
    }
    else if (this.nextStep == 8 && this.isContinueToNext == false) {
      if (this.llcs_list.length == 0 && this.LLCsForm.value.name) {
        this.addUserLLCs(false);
      }
      else if (this.lending_institution_list.length == 0 && this.lendingInstitutionForm.value.institution_name) {
        this.addUserLendingInstitution(false);
      }
      else if (this.insurance_agency_list.length == 0 && this.insuranceAgencyForm.value.agency_name) {
        this.addUserInsuranceAgency(false);
      }
      else {
        this.addPropertyDetails();
      }
    }

    if (this.isContinueToNext) {
      switch (this.nextStep) {
        case 0:
          this.nextStep = 1;
          this.mainHeading = 'Your LLCs:'
          this.isContinueToNext = false;
          break;
        case 1:
          this.nextStep = 2;
          this.mainHeading = 'Your Preferred:'
          this.subHeading = 'Lending Institution'
          this.isContinueToNext = false;
          break;
        case 2:
          this.nextStep = 3;
          this.subHeading = 'Insurance Agency'
          this.isContinueToNext = false;
          break;
        case 3:
          this.nextStep = 4;
          this.signupSubHeading = 'adding a few of your investment properties'
          this.mainHeading = 'Property 1:'
          this.subHeading = 'Address'
          // this.isContinueToNext = false;
          break;
        case 4:
          this.nextStep = 5;
          this.subHeading = 'LLC'
          // this.isContinueToNext = false;
          break;
        case 5:
          this.nextStep = 6;
          this.subHeading = 'Occupancy'
          // this.isContinueToNext = false;
          break;
        case 6:
          this.nextStep = 7;
          this.subHeading = 'Insurance'
          // this.isContinueToNext = false;
          break;
        case 7:
          this.nextStep = 8;
          this.subHeading = 'Lender'
          this.isContinueToNext = false;
          break;
        case 8:
          this.nextStep = 9;
          this.mainHeading = 'Great, ' + this.newSignUpForm.value.lastname + "!"
          this.subHeading = "You've added your first property."
          // this.isContinueToNext = false;
          break;
      }
    }
  }

  currentlyInsured(event: MatSlideToggleChange) {
    this.propertyDetailsForm.controls['isCurrentlyInsured'].setValue(event.checked);
    if (event.checked && this.insurance_agency_list.length == 0) {
      this.getInsuranceAgencyByUserId(this.loginUserDetails.userId);
    }
  }

  wasItFinanced(event: MatSlideToggleChange) {
    this.propertyDetailsForm.controls['isWasItFinanced'].setValue(event.checked);
    if (event.checked && this.lending_institution_list.length == 0) {
      this.getLendingInstitutionByUserId(this.loginUserDetails.userId);
    }
  }

  openProperty() {
    this.openDialog();
  }

  showHidePassword() {
    this.hide = !this.hide;
  }

  addUserLLCs(isContinueToNext: boolean) {
    // return new Promise((resolve: any, reject) => {
    //   setTimeout(() => {
    if (this.LLCsForm.valid) {
      let payload = this.LLCsForm.value;
      payload.userid = this.loginUserDetails.userId;
      this.sharedService.addUserLLCs(payload)
        .subscribe({
          next: (res: any) => {
            if (res.data) {
              this.isContinueToNext = isContinueToNext;
              this.toastr.success('Successfully LLC updated in your profile!', 'Success');
              this.propertyDetailsForm.controls['llc_id'].setValue(res.data.id);
              this.llcs_list = res.data;
              this.continue();
            }
          },
          error: (error: any) => {
            this.toastr.error(error.error.message, 'Error');
          },
        });
    }
    //     resolve();
    //   }, 3000);
    // })
  }

  addUserLendingInstitution(isContinueToNext: boolean) {
    if (this.lendingInstitutionForm.valid) {
      let payload = this.lendingInstitutionForm.value;
      payload.userid = this.loginUserDetails.userId;
      this.sharedService.addUserLendingInstitution(payload)
        .subscribe({
          next: (res: any) => {
            if (res.data) {
              this.isContinueToNext = isContinueToNext;
              this.toastr.success('Successfully Lending Institution updated in your profile!', 'Success');
              this.propertyDetailsForm.controls['lending_institution_id'].setValue(res.data.id);
              this.lending_institution_list = res.data;
              this.continue();
            }
          },
          error: (error: any) => {
            this.toastr.error(error.error.message, 'Error');
          },
        });
    }
    else {
      this.isContinueToNext = true;
    }
  }

  addUserInsuranceAgency(isContinueToNext: boolean) {
    if (this.insuranceAgencyForm.valid) {
      let payload = this.insuranceAgencyForm.value;
      payload.userid = this.loginUserDetails.userId;
      this.sharedService.addUserInsuranceAgency(payload)
        .subscribe({
          next: (res: any) => {
            if (res.data) {
              this.isContinueToNext = isContinueToNext;
              this.toastr.success('Successfully Insurance Agency updated in your profile!', 'Success');
              this.propertyDetailsForm.controls['insurance_agency_id'].setValue(res.data.id);
              this.insurance_agency_list = res.data;
              this.continue();
            }
          },
          error: (error: any) => {
            this.toastr.error(error.error.message, 'Error');
          },
        });
    }
    else {
      this.isContinueToNext = true;
    }
  }

  addPropertyDetails() {
    this.propertyDetailsForm.controls['userid'].setValue(this.loginUserDetails.userId);
    if (this.propertyDetailsForm.valid) {
      let payload = this.propertyDetailsForm.value;
      this.sharedService.addPropertyDetails(payload)
        .subscribe({
          next: (res: any) => {
            if (res.data) {
              this.isContinueToNext = true;
              this.toastr.success('Successfully Property added in your profile!', 'Success');
              this.continue();
            }
          },
          error: (error: any) => {
            this.toastr.error(error.error.message, 'Error');
          },
        });
    }
    else {
      this.isContinueToNext = false;
      this.toastr.error("Please provide the required(*) information!", 'Error');
    }
  }
  addNewRowForLLC() {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '550px',
      disableClose: true,
      data: {
        submitTitle: "Continue",
        heading: "You're all set!",
        dialogContent: "Now that your properties have been added, you can see them all here on your portfolio page. Click an address to access and add more details. There you can add expensed, vendors, obtain insurance quotes and more. If you need assistance, chat is available 24 hours a day. Enjoy!",
        action: "openProperty",
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can handle the result after the dialog is closed
    });
  }
}
