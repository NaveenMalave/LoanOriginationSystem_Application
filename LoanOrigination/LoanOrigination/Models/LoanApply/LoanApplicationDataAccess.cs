using Microsoft.EntityFrameworkCore;
using LoanOrigination.CustomerDetails.Models;
using LoanOrigination.Models.CustomerSearch;
using Microsoft.AspNetCore.Mvc;
using LoanAppExceptionLib;
using Npgsql;
using Microsoft.AspNetCore.Http.HttpResults;

namespace LoanOrigination.Models
{
    public class LoanApplicationDataAccess : ILoanApplicationDataAccess
    {
        private readonly LoanApplicationDbContext _dbContext;

        public LoanApplicationDataAccess(LoanApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public decimal? GetNetIncomeByCustomerId(int customerId)
        {
            var employment = _dbContext.Customers.FirstOrDefault(e => e.Id == customerId);
            return employment?.Net_Income;
        }

        public void AddLoanApplication(LoanApplication loanApplication)
        {
            _dbContext.LoanApplication.Add(loanApplication);
            _dbContext.SaveChanges();
        }

        public CustomerDetail? GetCustomerDetailsById(int customerId)
        {
            var empDetails = _dbContext.Customers.FirstOrDefault(e => e.Id == customerId);
            if (empDetails == null) return null;

            return new CustomerDetail
            {
                Net_Income = empDetails.Net_Income,
                FirstName = empDetails.FirstName,
                LastName = empDetails.LastName,
            };

        }

        public List<LoanApplication> GetAll()
        {
            return _dbContext.LoanApplication.ToList();

        }


        public void UpdateStatus(int id, string status)
        {
            var application = _dbContext.LoanApplication.FirstOrDefault(e=> e.LoanId == id);
            if (application == null)
            {
                throw new KeyNotFoundException($"Loan application with ID {id} not found.");
            }

            if (application.LoanStatus.ToLower() == "pending")
            {
             
                if (status.ToLower() == "approved" || status.ToLower() == "rejected")
                {
                    application.LoanStatus = status.ToLower(); 
                    _dbContext.Update(application);
                    _dbContext.SaveChanges(true);
                }
                else
                {
                    throw new ArgumentException("Invalid status. Only 'approved' or 'rejected' are allowed.");
                }
            }
            else
            {
                throw new InvalidOperationException("Only applications with 'pending' status can be updated.");
            }
        }

    }
}
