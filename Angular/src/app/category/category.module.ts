import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListingComponent } from './components/category-listing/category-listing.component';
import { CategoryService } from './service/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';



@NgModule({
  declarations: [CategoryListingComponent, ViewCategoryComponent, CategoryFormComponent],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[CategoryListingComponent, ViewCategoryComponent,CategoryFormComponent],
  providers:[CategoryService]
})
export class CategoryModule { }
