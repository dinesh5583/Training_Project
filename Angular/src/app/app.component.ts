import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './admins/service/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authservice:AdminService,private route:Router) {

  }
  title = 'Invoice';
  authInfo:any;
  ngOnInit(): void {
    this.authInfo=this.authservice.getAuthData();
    if(this.authInfo){
      this.route.navigate(['/dashboard/admin'])

    }
    else{
      this.route.navigate(['/login'])

    }
  }
}
