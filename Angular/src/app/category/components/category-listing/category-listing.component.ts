import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatData } from '../../models/category.model';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css']
})
export class CategoryListingComponent implements OnInit {

  constructor(
    private catServices: CategoryService,
    private router: Router
  ) {}
  dataSource: CatData[] = [];

  ngOnInit(): void {
    this.getListCat()
  }

  getListCat(){
    this.catServices.getCat().subscribe(
      (res:CatData[]) => {
        this.dataSource = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onDelete(id: string) {
    console.log(id)
    this.catServices.deleteCat(id).subscribe((res) => {
      this.getListCat();

      console.log(res);
    });
  }
}
