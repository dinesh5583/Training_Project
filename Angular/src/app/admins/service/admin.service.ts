import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Admin } from '../models/admin.model';
import { AuthData } from '../models/auth.model';

const BASE_URL = 'http://localhost:5000/api';
@Injectable()
export class AdminService {
  private admin_id:string;
  private token:any;
  userName:string;
  private isAuthenticated=false;
  private subject =new Subject<boolean>();

  constructor(private httpClient: HttpClient,private router:Router) {}

  getAdmin(): Observable<Admin[]> {
    return this.httpClient.get<Admin[]>(`${BASE_URL}/admin/list`);
  }

  createAdmin(body: Admin): Observable<Admin> {
    return this.httpClient.post<Admin>(`${BASE_URL}/admin/add`, body);
  }
  deleteAdmin(id: string) {
    return this.httpClient.delete(`${BASE_URL}/admin/delete/${id}`);
  }
  updateAdmin(user:AuthData):Observable<AuthData>{
    return this.httpClient.put<AuthData>(`${BASE_URL}/admin/update/${user.admin_id}`, user);

  }

  viewAdmin(id:string){
    return this.httpClient.get(`${BASE_URL}/admin/${id}`);
  }

  login(data:AuthData) {
    this.httpClient.post<{admin_id:string, name:string, token:string}>(`${BASE_URL}/login`,data)
    .subscribe((response)=>{
      const token=response.token;
      this.token=token;
      const admin_id=response.admin_id;
      this.admin_id=admin_id;
      const name=response.name
      this.userName=name;
      if(token){
        this.isAuthenticated=true;
        this.subject.next(true);
        this.saveAuthData(token,name,admin_id)
        this.router.navigate(['/dashboard/admin'])
      }
    },(err)=>{
       this.subject.next(false)

    });
  }
  private saveAuthData(token: string,name:string,admin_id:string ){
    localStorage.setItem('token',token);
    localStorage.setItem('name',name);
    localStorage.setItem('admin_id',admin_id);
  }

  createUser(data:AuthData) {
    this.httpClient.post<{admin_id:string, name:string, token:string}>(`${BASE_URL}/signup`,data)
    .subscribe((response)=>{
      console.log(response)
      const token=response.token;
      this.token=token;
      const admin_id=response.admin_id;
      this.admin_id=admin_id;
      const name=response.name
      this.userName=name;
      if(token){
        this.isAuthenticated=true;
        this.subject.next(true);
        this.saveAuthData(token,name,admin_id)
        this.router.navigate(['/dashboard/admin'])
      }
    },(err)=>{
       this.subject.next(false)

    });

 }

 logout(){
  this.token=null;
  this.subject.next(false);         //user not authenticated
  this.clearAuthData();
  this.router.navigate(['/login'])
}
private clearAuthData(){
  localStorage.removeItem('token')
  localStorage.removeItem('name')
  localStorage.removeItem('admin_id')
}
getAuthData(){
  const token= localStorage.getItem('token');
  const name= localStorage.getItem('name');
  const admin= localStorage.getItem('admin_id');

  if(!token || !name || !admin){
    return;
  }
  return {
    token:token,
    name:name,
    admin:admin
  };
}
}
