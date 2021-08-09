import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CatData } from '../../models/category.model';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private catService: CategoryService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route:ActivatedRoute
  ) {}
  catForm: FormGroup;
  mode="create";
  private id:any;
  user:CatData;

  ngOnInit(): void {
    this.createForm();
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.mode='edit';
        this.id=paramMap.get('id');

        this.catService.viewCat(this.id).subscribe((res:any)=>{

           this.user=res[0];
          console.log(this.user)
           this.catForm.patchValue(this.user)
        });
      }else{
        this.mode='create';
        this.id=null;
      }
    });
  }
  createForm() {
    this.catForm = this.fb.group({
      cat_id: new FormControl(''),
      parent_id: new FormControl(''),
      cat_name: new FormControl('', [Validators.required]),
      created_by: new FormControl('', [Validators.required]),
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
    if(this.catForm.invalid){
      return;
    }

    if(this.mode==='create'){
      this.catService.createcat(this.catForm.value).subscribe(
        (res) => {
           this.snackbar.open('Category Created', 'Success', {
             duration: 2000,
           });
           this.router.navigate(['/dashboard/category']);
           this.catForm.reset();
          console.log(res);
        },
        (err) => {
          this.errorHandler(err, 'Failed to create Category');
        }
      );
    }else{
      this.catService.updateCat(this.catForm.value).subscribe(
        (res)=>{
          console.log(res);
          this.router.navigate(['/dashboard/category']);
        },
        (err)=>{
          console.log(err);
        }
      )
    }

  }
}
