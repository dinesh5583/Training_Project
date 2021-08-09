import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  private id:any;
  user:any;
  constructor(private catService:CategoryService,
          private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.id=paramMap.get('id');
        this.catService.viewCat(this.id).subscribe((res)=>{
          this.user=res;
          console.log(this.user);
        });
      }
    });
  }

}
