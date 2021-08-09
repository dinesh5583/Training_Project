import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProData } from '../../model/product.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private proService: ProductService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route:ActivatedRoute
  ) {}
  ProFrom: FormGroup;
  mode="create";
  private id:any;
  user:ProData;

  ngOnInit(): void {
    this.createForm();
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.mode='edit';
        this.id=paramMap.get('id');

        this.proService.viewPro(this.id).subscribe((res:any)=>{

           this.user=res[0];
          console.log(this.user)
           this.ProFrom.patchValue(this.user)
        });
      }else{
        this.mode='create';
        this.id=null;
      }
    });
  }
  createForm() {
    this.ProFrom = this.fb.group({
      pro_id: new FormControl(''),
      pro_name: new FormControl('', [Validators.required]),
      pro_desc: new FormControl('', [Validators.required]),
      cat_id: new FormControl('', [Validators.required]),
      is_active: new FormControl('', [Validators.required]),
      created_by: new FormControl(''),
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
    if(this.ProFrom.invalid){
      return;
    }

    if(this.mode==='create'){
      this.proService.createPro(this.ProFrom.value).subscribe(
        (res) => {
           this.snackbar.open('Product Created', 'Success', {
             duration: 2000,
           });
           this.router.navigate(['/dashboard/product']);
           this.ProFrom.reset();
          console.log(res);
        },
        (err) => {
          this.errorHandler(err, 'Failed to create Product');
        }
      );
    }else{
      this.proService.updatePro(this.ProFrom.value).subscribe(
        (res)=>{
          console.log(res);
          this.router.navigate(['/dashboard/product']);
        },
        (err)=>{
          console.log(err);
        }
      )
    }

  }
}
