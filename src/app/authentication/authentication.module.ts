import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { AuthenticationService } from './authentication.service';
import { NgxMaskModule, IConfig } from 'ngx-mask';



const authenticationRoute: Routes = [{
  path: 'signin',
  component: SigninComponent
}]
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  
  imports: [
    CommonModule,
    RouterModule.forChild(authenticationRoute),
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskModule.forRoot(maskConfig),
  ],

  declarations: [SigninComponent],
  providers: [
    AuthenticationService
  ],
})
export class AuthenticationModule { }
