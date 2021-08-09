import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  private id:any;
  user:any;
  constructor(private proService:ProductService,
          private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.id=paramMap.get('id');
        this.proService.viewPro(this.id).subscribe((res)=>{
          this.user=res;
          console.log(this.user);
        });
      }
    });
  }

}
