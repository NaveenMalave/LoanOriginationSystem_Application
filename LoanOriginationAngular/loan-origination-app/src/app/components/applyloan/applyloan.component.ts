import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyloanService } from 'src/app/services/applyloan/applyloan.service';

@Component({
  selector: 'applyloan',
  templateUrl: './applyloan.component.html',
  styleUrls: ['./applyloan.component.css']
})
export class ApplyloanComponent {
  title = 'Loan Calculation';
  customer_id: number = 0;
  firstname : string = '';
  lastname: string = '';
  employee_id:number= Number(localStorage.getItem('employee_Id'));
  date_of_request:Date=new Date();
  net_income: number = 0;
  loan_status:string='pending';
  maxLoanAmount: number = 0;
  suggestedLoanAmount: number = 0;
  minLoanAmount: number = 20000;
  loan_amount: number = 0;
  loan_tenure: number = 24;
  rate_of_intrest: number = 6;
  showLoanForm: boolean = false;
  emi: number = 0;
  
  link:string="http://localhost:5133/api/loan/calculate-and-add/"
  constructor(private http:HttpClient,private loanservice:ApplyloanService, private activateRoute: ActivatedRoute, private router: Router){
    this.customer_id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.fetchNetIncome();
    this.fetchCustomerDetails();

  }



  fetchCustomerDetails() {
    this.loanservice.getDetails(this.customer_id).subscribe(
      (data: any) => {
        console.log('Customer Details:', data);
        this.firstname = data.firstName;
        this.lastname = data.lastName;
      },
      (error: any) => {
        console.error('Error fetching customer details:', error);
      }
    );
  }

  


  fetchNetIncome() {
    this.loanservice.getNetIncome(this.customer_id).subscribe((data) => {
      this.net_income = data;
      if(!data){
        alert("Customer doesnot exist");
      }
      this.calculateLoanAmount();
    });
  }



  calculateLoanAmount() {
    this.suggestedLoanAmount = Math.round(this.net_income / 3); 
  
    this.maxLoanAmount = Math.round(this.net_income / 2); 
    this.loan_amount = this.suggestedLoanAmount;
    
}
calculateEMI() {
  const principal = this.loan_amount;
  const interestRate = this.rate_of_intrest / 12 / 100;
  const tenure = this.loan_tenure;
  this.emi = Math.round((principal * interestRate * Math.pow(1 + interestRate, tenure)) / (Math.pow(1 + interestRate, tenure) - 1));
}

  proceed() {
    this.showLoanForm = true;
  }
  submitLoan() {
    
    const loanData = {
      CustomerId: this.customer_id,
      LoanAmount: this.loan_amount,
      LoanTenure: this.loan_tenure,
      EmployeeId:this.employee_id,
      RateOfIntrest:this.rate_of_intrest,
      DateOfRequest: this.date_of_request,
      LoanStatus:this.loan_status,
    };
    console.log(loanData);
    this.loanservice.addLoan(this.customer_id,loanData).subscribe(response => {
      alert('Loan application submitted successfully');
      this.router.navigate(['/dashboard']);
    });
  }
 
}
