import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExistingcustomerService } from 'src/app/services/existingcustomer/existingcustomer.service';

@Component({
  selector: 'app-existingdetails',
  templateUrl: './existingdetails.component.html',
  styleUrls: ['./existingdetails.component.css']
})
export class ExistingdetailsComponent implements OnInit {
 
    customerForm: FormGroup;
    customer_id: number = 0;
  
    constructor(private fb: FormBuilder, private customerService: ExistingcustomerService,private activateRoute: ActivatedRoute, private router: Router){
        this.customer_id = Number(this.activateRoute.snapshot.paramMap.get('id')) 
      this.customerForm = this.fb.group({
        id: [{ value: '', disabled: true }],
        firstName: [{ value: '', disabled: true }],
        lastName: [{ value: '', disabled: true }],
        date_of_Birth: [{ value: '', disabled: true }],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required, Validators.minLength(3)]],
        company_Name: ['', [Validators.required, Validators.minLength(3)]],
        salary: ['', [Validators.required, Validators.min(1000)]],
        net_Income: ['', Validators.required],
        last_salary_date: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
      this.getCustomerDetails(this.customer_id); 
    }
  
    getCustomerDetails(id: number): void {
      this.customerService.getCustomerById(id).subscribe(data => {
        this.customerForm.patchValue(data);
      });
    }
  
    onSubmit(): void {
      if (this.customerForm.valid) {
        const updatedDetails = this.customerForm.getRawValue();
        this.customerService.updateCustomerDetails(updatedDetails).subscribe(response => {
          alert('Customer updated successfully:');
          this.router.navigate(['/apply-loan', response.id]);
        });
      }
    }
  
    onCancel(): void {
      this.router.navigate(['/apply-loan', this.customer_id]);
    }
}