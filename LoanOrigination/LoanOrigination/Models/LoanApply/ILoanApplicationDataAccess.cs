using LoanOrigination.CustomerDetails.Models;
namespace LoanOrigination.Models
{
    public interface ILoanApplicationDataAccess
    {
       public decimal? GetNetIncomeByCustomerId(int customerId); // Synchronous method to get net income
       public void AddLoanApplication(LoanApplication loanApplication); // Synchronous method to add a loan application
       CustomerDetail? GetCustomerDetailsById(int customerId);
       List<LoanApplication> GetAll();
        public void UpdateStatus(int id, string status );
    }
}
