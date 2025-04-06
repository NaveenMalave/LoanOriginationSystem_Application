using LoanAppExceptionLib;
using Npgsql;

namespace LoanOrigination.CustomerDetails.Models
{
    public class CustomerDetailsDataAccess : ICustomerDetailsDataAccess
    {
        private readonly CustomerDetailsDBContext _dbContext;
        public CustomerDetailsDataAccess(CustomerDetailsDBContext _dbContext)
        {
            this._dbContext = _dbContext;
        }
        public void AddCustomerDetails(CustomerDetail customerDetails)
        {
            try
            {
                if (customerDetails == null)
                {
                    throw new CustomerException("Customer object cannot be null.");
                }
                _dbContext.Add(customerDetails);
                _dbContext.SaveChanges();
            }
            catch(NpgsqlException ex)
            {
                //log the exception ex
                throw new Exception("some database error,try later:"+ex.Message);
            }
            catch (Exception ex)
            {
                //log the exception ex 
                throw new CustomerException("An error occurred while adding the customerDetails.");
            }
           
        }

        public CustomerDetail GetCustomerDetailsById(int id)
        {
            try
            {
                var customerDetail = _dbContext.CustomerDetails.Find(id);
                if (customerDetail == null)
                {
                    throw new CustomerException("Customer not found.");
                }
                return customerDetail;
            }
            catch (NpgsqlException ex)
            {
                
                throw new Exception("Database error, try later: " + ex.Message);
            }
            catch (Exception ex)
            {
               
                throw new CustomerException("An error occurred while retrieving the customer details.");
            }
        }


        public void UpdateCustomerDetails(CustomerDetail customerDetails)
        {
            try
            {
                var existingDetails = _dbContext.CustomerDetails.Find(customerDetails.Id);
                if (existingDetails == null)
                {
                    throw new CustomerException("Customer not found.");

                }

                existingDetails.Phone = customerDetails.Phone;
                existingDetails.Email = customerDetails.Email;
                existingDetails.Address = customerDetails.Address;
                existingDetails.Company_Name = customerDetails.Company_Name;
                existingDetails.Salary = customerDetails.Salary;
                existingDetails.Net_Income = customerDetails.Net_Income;
                existingDetails.Last_salary_date = customerDetails.Last_salary_date;
                _dbContext.Update(existingDetails);
                _dbContext.SaveChanges();
            }
            catch (NpgsqlException ex)
            {

                throw new Exception("Database error, try later: " + ex.Message);
            }
            catch (Exception ex)
            {
                throw new CustomerException("An error occurred while updating the customer details.");
            }
        }
    }
}
