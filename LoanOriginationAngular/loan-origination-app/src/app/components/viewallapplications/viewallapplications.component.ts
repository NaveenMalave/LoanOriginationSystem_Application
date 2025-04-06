import { Component, OnInit } from '@angular/core';
import { ApplyloanService } from 'src/app/services/applyloan/applyloan.service';

@Component({
  selector: 'app-viewallapplications',
  templateUrl: './viewallapplications.component.html',
  styleUrls: ['./viewallapplications.component.css']
})
export class ViewallapplicationsComponent implements OnInit {
 applications: any[]  = [];

 constructor(private applicationService: ApplyloanService){}

 ngOnInit(): void {
     this.applicationService.getAllApplications().subscribe((data)=>{
      this.applications = data;
      console.log(data);
     })
 }

 

 approve(applicationId: number) {
  this.applicationService.updateStatus(applicationId, 'approved').subscribe(
    (response) => {
      alert("Loan Application Approved")
      const index = this.applications.findIndex(app => app.loanId === applicationId);
      if (index !== -1) {
        this.applications[index].loanStatus = 'approved';
      }
    },
    (error) => {
      console.error('Error updating status:', error);
    }
  );
}

reject(applicationId: number) {
  this.applicationService.updateStatus(applicationId, 'rejected').subscribe(
    (response) => {
      alert('Loan Application rejectd:');
      const index = this.applications.findIndex(app => app.loanId === applicationId);
      if (index !== -1) {
        this.applications[index].loanStatus = 'rejected';
      }
    },
    (error) => {
      console.error('Error updating status:', error);
    }
  );
}

}
