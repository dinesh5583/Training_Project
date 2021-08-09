import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/admins/service/admin.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  AuthInfo:any;
  constructor(private adminService:AdminService) { }
  @Output() toggleSideNav= new EventEmitter();
  ngOnInit(): void {
    this.AuthInfo=this.adminService.getAuthData();
  }
  onLogout(){
    this.adminService.logout();
  }

}
