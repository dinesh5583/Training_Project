import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthData } from '../../models/auth.model';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-viewadmin',
  templateUrl: './viewadmin.component.html',
  styleUrls: ['./viewadmin.component.css']
})
export class ViewadminComponent implements OnInit {

  private id:any;
  user:any;
  constructor(private adminService:AdminService,
          private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.id=paramMap.get('id');
        this.adminService.viewAdmin(this.id).subscribe((res)=>{
          this.user=res;
          console.log(this.user);
        });
      }
    });
  }

}
