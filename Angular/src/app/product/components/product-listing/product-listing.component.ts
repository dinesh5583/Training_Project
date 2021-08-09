import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/admins/models/admin.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  constructor(
    private proServices: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListProduct()
  }
  getListProduct(){
    this.proServices.getProduct().subscribe(
      (res) => {
        this.dataSource = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createBtnHandler() {
    this.router.navigate(['/dashboard/product/new']);
  }
  onDelete(id:number) {
  console.log(id)
  this.proServices.deletePro(id).subscribe((res) => {
  this.getListProduct();

  console.log(res);
   });
  }

  displayedColumns: string[] = [
    'pro_id',
    'pro_name',
    'pro_desc',
    'is_active',
    'created_by',
    'created_at',
    'cat_name',
    'parent_id',
    'action'
  ];
  dataSource: Admin[] = [];


}
