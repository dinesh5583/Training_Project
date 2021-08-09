import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFormComponent } from '../admins/components/admin-form/admin-form.component';
import { AdminListingComponent } from '../admins/components/admin-listing/admin-listing.component';
import { DashboardComponent } from './dashboard.component';
import { ViewadminComponent } from '../admins/components/viewadmin/viewadmin.component';
import { CategoryListingComponent } from '../category/components/category-listing/category-listing.component';
import { ViewCategoryComponent } from '../category/components/view-category/view-category.component';
import { CategoryFormComponent } from '../category/components/category-form/category-form.component';
import { ProductListingComponent } from '../product/components/product-listing/product-listing.component';
import { ProductFormComponent } from '../product/components/product-form/product-form.component';
import { ViewProductComponent } from '../product/components/view-product/view-product.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'admin', component: AdminListingComponent },
      { path: 'admin/new', component: AdminFormComponent },
      { path: 'category/new', component: CategoryFormComponent  },
      { path: 'dashboard/new/:id', component:  CategoryFormComponent},
      { path: 'product', component: ProductListingComponent },
      { path: 'product/new', component: ProductFormComponent  },
      { path: 'product/new/:id', component: ProductFormComponent  },
      { path: 'product/view/:id', component: ViewProductComponent },

      { path: 'admin/view/:id', component: ViewadminComponent },
      { path: 'category/view/:id', component: ViewCategoryComponent },
      { path: 'admin/new/:id', component: AdminFormComponent },
      { path: 'category', component: CategoryListingComponent },
      { path: '', redirectTo: 'admin' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
