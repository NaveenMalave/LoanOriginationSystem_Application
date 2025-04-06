import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApplyloanService {
  baseUrl="http://localhost:5133/api/loan";
  constructor(private http:HttpClient) { }
  getNetIncome(id:number=1):Observable<any>{
    return this.http.get(this.baseUrl+'/GetNetIncome?customerId='+id);
  }
  addLoan(id:number,loan:any):Observable<any>{
    return this.http.post(this.baseUrl+'/calculate-and-add/'+id,loan);
  }
 
  getDetails(id:number=1):Observable<any>{
    return this.http.get(this.baseUrl+'/GetDetails?customerId='+id);
  }

  getAllApplications(){
    return this.http.get<any[]>(this.baseUrl+'/GetAll');
  }

  updateStatus(applicationId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/UpdateStatus/${applicationId}/${status}`, {});
  }
  

}

