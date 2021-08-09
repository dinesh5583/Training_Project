import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admins/service/admin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  IsActive = [true, false];

  empform:FormGroup;
  isLoading:boolean=false;
  user:Object;
 constructor(
        private fb:FormBuilder,
        private authservice:AdminService,
        private router :Router) { }
  ngOnInit(): void {
    this.empform = this.fb.group({
      admin_id: [''],
      admin_name:['',Validators.required],
      admin_email: ['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      role_id:[''],
      is_active:[''],
      created_at:['']

    });


  }

  onSignup(){
    if(this.empform.invalid){
      return;
    }
    console.log(this.empform.value)
    this.authservice.createUser(this.empform.value);
  }

}
