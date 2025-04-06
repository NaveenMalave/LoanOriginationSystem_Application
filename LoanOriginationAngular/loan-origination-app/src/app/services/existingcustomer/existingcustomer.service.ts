import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExistingcustomerService {

  private apiUrl = 'http://localhost:5133/api/AddCustomer'; // Update with your API URL

  constructor(private http: HttpClient) {}

  getCustomerById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetDetailsById/${id}`);
  }

  updateCustomerDetails(customerDetails: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateDetails`, customerDetails);
  }
}
