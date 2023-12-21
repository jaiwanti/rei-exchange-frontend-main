import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NewSignupComponent } from './new-signup.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NewSignUpService } from './new-signup.service';

const userRoute: Routes = [
  {
    path: '',
    component: NewSignupComponent,
  },
];
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoute),
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    NgxMaskModule.forRoot(maskConfig),
  ],

  declarations: [NewSignupComponent],
  providers: [NewSignUpService],
})
export class newSignUpModule { }
