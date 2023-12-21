
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from "@angular/material/menu";
import { MatBadgeModule } from "@angular/material/badge";
import { BreadcrumbModule } from 'xng-breadcrumb';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
// import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxFormModule, DxLoadPanelModule, DxPopupModule, DxRadioGroupModule, DxScrollViewModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';
// import { MultilevelMenuService, NgMaterialMultilevelMenuModule , ɵb } from "ng-material-multilevel-menu";
import { MatRippleModule } from "@angular/material/core";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    BreadcrumbModule,
    MatToolbarModule,
    MatTooltipModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    // DxLoadPanelModule,
    // NgMaterialMultilevelMenuModule,
    MatRippleModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    // Ng2SearchPipeModule, 
    // DxFormModule, 
    // DxDateBoxModule, 
    // DxTextAreaModule, 
    // DxTextBoxModule, 
    // DxDataGridModule, 
    // DxLoadPanelModule, 
    // DxTagBoxModule, 
    // DxValidatorModule, 
    // DxButtonModule, 
    // DxPopupModule, 
    // DxRadioGroupModule, 
    // DxScrollViewModule,
    FormsModule, 
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    NgxDocViewerModule,
    SweetAlert2Module,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [],
  providers: [],
})
export class CoreModule {}
