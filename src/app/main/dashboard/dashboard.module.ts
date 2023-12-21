import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const dashboardRoute: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoute),
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule
  ],

  declarations: [DashboardComponent],
  providers: [AuthGuard],
})
export class dashboardModule {}
