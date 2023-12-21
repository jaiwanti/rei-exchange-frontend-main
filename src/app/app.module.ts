import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { JwtInterceptor } from './core/helper/jwt.interceptor';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import { DxButtonModule, DxLoadPanelModule, DxPopupModule, DxScrollViewModule } from 'devextreme-angular';
// import { CanDeactivateGuard } from './core/guard/can-deactivate.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { AuthGuard } from './core/guard/auth.guard';
import { LayoutComponent } from './main/shared/layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ConfirmationDialogComponent } from './main/shared/confirmation-dialog/confirmation-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      preventDuplicates: false,
      progressBar: true,
      progressAnimation: "increasing",
    }),
    SweetAlert2Module.forRoot(),
    //DxLoadPanelModule,
    // DxScrollViewModule,
    // DxButtonModule,
    // DxPopupModule,
    MatDialogModule,
    MatDividerModule,
    MatSidenavModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,

    },
    // CanDeactivateGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
