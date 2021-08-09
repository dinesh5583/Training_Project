import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Admin } from 'src/app/admins/models/admin.model';
import { ProData } from '../model/product.model';

const BASE_URL = 'http://localhost:5000/api';

@Injectable()
export class ProductService {

  constructor(private httpClient:HttpClient) { }
  getProduct(): Observable<Admin[]> {
    return this.httpClient.get<Admin[]>(`${BASE_URL}/product/list`);
  }
  deletePro(id: number) {
    return this.httpClient.delete(`${BASE_URL}/product/delete/${id}`);
  }
  updatePro(user:ProData):Observable<ProData>{
    return this.httpClient.put<ProData>(`${BASE_URL}/product/update/${user.pro_id}`, user);

  }

  viewPro(id:number){
    return this.httpClient.get(`${BASE_URL}/product/${id}`);
  }
  createPro(body: ProData): Observable<ProData> {
    return this.httpClient.post<ProData>(`${BASE_URL}/product/add`, body);
  }
}
