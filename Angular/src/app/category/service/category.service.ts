import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatData } from '../models/category.model';

const BASE_URL = 'http://localhost:5000/api';
@Injectable()
export class CategoryService {
  constructor(private httpClient:HttpClient){}
  getCat(): Observable<CatData[]> {
    return this.httpClient.get<CatData[]>(`${BASE_URL}/category/list`);
  }
  viewCat(id:string){
    return this.httpClient.get(`${BASE_URL}/category/${id}`);
  }
  createcat(body: CatData): Observable<CatData> {
    return this.httpClient.post<CatData>(`${BASE_URL}/category/add`, body);
  }
  updateCat(user:CatData):Observable<CatData>{
    return this.httpClient.put<CatData>(`${BASE_URL}/category/update/${user.cat_id}`, user);

  }
  deleteCat(id: string) {
    return this.httpClient.delete(`${BASE_URL}/category/delete/${id}`);
  }

}
