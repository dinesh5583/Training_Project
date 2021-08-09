import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { MaterialModule } from '../shared/material.module';
import { AdminModule } from '../admins/admins.module';
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';

@NgModule({
  declarations: [DashboardComponent, SideNavComponent, ToolbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    AdminModule,
    CategoryModule,
    ProductModule
  ],
})
export class DashboardModule {}
