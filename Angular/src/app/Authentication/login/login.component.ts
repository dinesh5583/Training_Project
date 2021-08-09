import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../admins/service/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private adminService: AdminService,private router:Router) { }
  loginForm:FormGroup;
  ngOnInit(): void {
    this.createForm();

  }
  createForm() {
    this.loginForm = this.fb.group({
      admin_id: new FormControl(''),
      admin_name: new FormControl(''),
      admin_email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
      role_id: new FormControl(''),
      is_active:new FormControl(''),
      created_at:new FormControl('')

    });
  }
  onLogin(){
    if(this.loginForm.invalid){
      return;
    }
    console.log(this.loginForm.value)
    this.adminService.login(this.loginForm.value);
  }
  onSignup(){
    this.router.navigate(['/login/signup'])
  }

}
