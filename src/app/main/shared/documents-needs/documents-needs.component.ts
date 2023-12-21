import { Component,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/main/shared/shared.service';
import { DocumentsNeeds } from './documents-needs.component.api';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
// interface ListItem {
//   name: string;
//   file: File | null; // Allow null or File type
// }

@Component({
  selector: 'app-documents-needs',
  templateUrl: './documents-needs.component.html',
  styleUrls: ['./documents-needs.component.scss']
})
export class DocumentsNeedsComponent {
  @Input() documentsNeeds: BehaviorSubject<DocumentsNeeds> = new BehaviorSubject<DocumentsNeeds>({ modId: null!});
  base64File: any = null;
  filename: any = null;
  items: any;
  subscriptions: Subscription[] = []
  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private titleService: Title,
  ) { }

  ngOnInit() {
    var userDetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.loadDocumentList();
  }

  loadDocumentList() {
    this.subscriptions.push(this.documentsNeeds.subscribe((res: DocumentsNeeds) => {
      if (res.modId == 1) {
        this.items = [
          { name: 'RE Appraisal:', file: '' },
          { name: 'Loan Docs:', file: '' },
          { name: 'Misc:', file: '' },
          { name: 'Misc:', file: '' },
          // Add more items as needed
        ];
      }
      else if (res.modId == 2) {
        this.items = [
          { name: 'Home Inspection:', file: '' },
          { name: 'Misc:', file: '' },
          { name: 'Misc:', file: '' },
          { name: 'Misc:', file: '' },
          // Add more items as needed
        ];
      }
      else if (res.modId == 3) {
        this.items = [
          { name: 'Policy:', file: '' },
          { name: 'Policy:', file: '' },
          { name: 'Policy:', file: '' },
          { name: 'Misc:', file: '' },
          // Add more items as needed
        ];
      }
      else if (res.modId == 4) {
        this.items = [
          { name: 'Closing Statement:', file: '' },
          { name: 'Insurance Binder:', file: '' },
          { name: 'EOI:', file: '' },
          { name: 'Invoice:', file: '' },
          // Add more items as needed
        ];
      }
      else if (res.modId == 5) {
        this.items = [
          { name: 'Lease:', file: '' },
          { name: 'BIG Check:', file: '' },
          { name: 'Mics:', file: '' },
          { name: 'Mics:', file: '' },
          // Add more items as needed
        ];
      }
    }));

  }

  onFileSelect(event: any, index: number): void {
    try {
      const fileList: FileList | null = event.target.files;
      if (fileList && fileList.length > 0) {
        console.log('---fileList[0]---', fileList[0]);
        this.items[index].file = fileList[0].name;
        // You can do further processing with the selected file if needed
      }
      // const file = e.target.files[0];
      // const fReader = new FileReader()
      // fReader.readAsDataURL(file)
      // fReader.onloadend = (_event: any) => {
      //   this.filename = file.name;
      //   this.firstForm.controls['firstCtrl'].setValue(file.name);
      //   this.base64File = _event.target.result;
      // }
    } catch (error) {
      this.filename = null;
      this.base64File = null;
      console.log('no file was selected...');
    }
  }

}
