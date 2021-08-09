import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../../models/admin.model';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-listing',
  templateUrl: './admin-listing.component.html',
  styleUrls: ['./admin-listing.component.css']
})
export class AdminListingComponent implements OnInit {

  constructor(
    private adminServices: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListAdmin()
  }
  getListAdmin(){
    this.adminServices.getAdmin().subscribe(
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
    this.router.navigate(['/dashboard/admin/new']);
  }
  onDelete(id:string) {
    console.log(id)
    this.adminServices.deleteAdmin(id).subscribe((res) => {
      this.getListAdmin();

      console.log(res);
    });
  }

  displayedColumns: string[] = [
    'admin_id',
    'admin_name',
    'admin_email',
    'role_name',
    'is_active',
    'created_at',
    'action'
  ];
  dataSource: Admin[] = [];


}
