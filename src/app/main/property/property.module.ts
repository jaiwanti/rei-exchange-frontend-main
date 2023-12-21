import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PropertyComponent } from './property.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PropertyService } from './property.service';
import { DetailsComponent } from './details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { AddPropertyComponent } from './add-property/add-property.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog';
import { DocumentsNeedsComponent } from '../shared/documents-needs/documents-needs.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { OwnedPropertyComponent } from './owned-property/owned-property.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { AngularEditorModule } from '@kolkov/angular-editor';
const propertyRoute: Routes = [
  {
    path: '',
    component: PropertyComponent,
  },
  {
    path: "add-property",
    component: AddPropertyComponent,
    data: { breadcrumb: "Add Property" },
  },
  {
    path: "owned-property",
    component: OwnedPropertyComponent,
    data: { breadcrumb: "Owned Property" },
  },
  {
    path: "details",
    component: DetailsComponent,
    data: { breadcrumb: "Details" },
  },
  {
    path: "details/:id",
    component: DetailsComponent,
    data: { breadcrumb: "Details" },
  },
];
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(propertyRoute),
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatStepperModule,
    NgxMaskModule.forRoot(maskConfig),
    MatTooltipModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    CKEditorModule,
    AngularEditorModule
  ],

  declarations: [PropertyComponent, DetailsComponent, AddPropertyComponent, DocumentsNeedsComponent, OwnedPropertyComponent],
  providers: [AuthGuard, PropertyService],
})
export class propertyModule { }
