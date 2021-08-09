import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthData } from '../../models/auth.model';

import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route:ActivatedRoute
  ) {}
  AdminForm: FormGroup;
  mode="create";
  private id:any;
  user:AuthData;

  ngOnInit(): void {
    this.createForm();
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.mode='edit';
        this.id=paramMap.get('id');

        this.adminService.viewAdmin(this.id).subscribe((res:any)=>{

           this.user=res[0];
          console.log(this.user)
           this.AdminForm.patchValue(this.user)
        });
      }else{
        this.mode='create';
        this.id=null;
      }
    });
  }
  createForm() {
    this.AdminForm = this.fb.group({
      admin_id: new FormControl(''),
      admin_name: new FormControl('', [Validators.required]),
      admin_email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
      role_id: new FormControl('', [Validators.required]),
      is_active: new FormControl(''),
      created_at: new FormControl(''),


    });
  }

  private errorHandler(error: any, message: string) {
    console.log(error);
    this.snackbar.open(message, 'Error', {
      duration: 2000,
    });
  }
  onSubmit() {
    if(this.AdminForm.invalid){
      return;
    }

    if(this.mode==='create'){
      this.adminService.createAdmin(this.AdminForm.value).subscribe(
        (res) => {
           this.snackbar.open('Admin Created', 'Success', {
             duration: 2000,
           });
           this.router.navigate(['/dashboard/admin']);
           this.AdminForm.reset();
          console.log(res);
        },
        (err) => {
          this.errorHandler(err, 'Failed to create Admin');
        }
      );
    }else{
      this.adminService.updateAdmin(this.AdminForm.value).subscribe(
        (res)=>{
          console.log(res);
          this.router.navigate(['/dashboard/admin']);
        },
        (err)=>{
          console.log(err);
        }
      )
    }

  }
}
