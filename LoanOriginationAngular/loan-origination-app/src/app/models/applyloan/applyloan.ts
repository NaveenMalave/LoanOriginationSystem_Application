export class Applyloan {
    loan_id?:number;
    customer_id:number=0;
    employee_id:number=0;
    loan_amount:number=0;
    loan_status:string='';
    date_of_request?:Date;
    loan_tenure:number=0;
    rate_of_intrest:number=0;
    firstname: string = '';

constructor(loan_id:never,customer_id:number, employee_id:number, loan_amount: number, loan_status:string, date_of_request:Date, loan_tenure:number, rate_of_interest:number, firstname:string){
    this.loan_id = loan_id,
    this.customer_id = customer_id,
    this.employee_id = employee_id,
    this.loan_amount = loan_amount,
    this.loan_status = loan_status,
    this.date_of_request = date_of_request,
    this.loan_tenure = loan_tenure,
    this.rate_of_intrest = rate_of_interest,
    this.firstname = firstname
}
}
