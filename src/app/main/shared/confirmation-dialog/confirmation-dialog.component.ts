import { Component, Inject } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { AbstractControl, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
export interface DialogData {
  submitTitle: string;
  heading: string;
  dialogContent: string;
  action: string;
}
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  background = 'primary';
  mainHeading: string = "";
  content: string = "";
  submitTitle: string = 'Yes';
  hidden: boolean = true;
  constructor(
    private sharedService: SharedService,
    private toastr: ToastrService,
    private titleService: Title,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
  ) {
    
  }

  ngOnInit() {
    var userDetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.submitTitle = this.data.submitTitle;
    this.mainHeading = this.data.heading;
    this.content = this.data.dialogContent;
  }

  onSubmit() {
    if(this.data.action == 'openProperty'){
      this.router.navigate(['/portal/property']);
      this.dialogRef.close();
    }
  }
}
