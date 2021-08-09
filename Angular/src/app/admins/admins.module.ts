import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { AdminListingComponent } from './components/admin-listing/admin-listing.component';
import { AdminService } from './service/admin.service';
import { RouterModule } from '@angular/router';
import { ViewadminComponent } from './components/viewadmin/viewadmin.component';

@NgModule({
  declarations: [AdminFormComponent, AdminListingComponent, ViewadminComponent],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [AdminFormComponent, AdminListingComponent,ViewadminComponent],
  providers: [AdminService],
})
export class AdminModule {}
