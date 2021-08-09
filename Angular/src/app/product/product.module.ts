import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { RouterModule } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductService } from './service/product.service';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ViewProductComponent } from './components/view-product/view-product.component';

@NgModule({
  declarations: [ProductFormComponent, ProductListingComponent, ViewProductComponent],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [ProductFormComponent, ProductListingComponent, ViewProductComponent],
  providers: [ProductService],
})
export class ProductModule {}
