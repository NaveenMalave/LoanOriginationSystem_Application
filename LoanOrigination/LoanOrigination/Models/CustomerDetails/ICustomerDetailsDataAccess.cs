namespace LoanOrigination.CustomerDetails.Models
{
    public interface ICustomerDetailsDataAccess
    {
        void AddCustomerDetails(CustomerDetail customerDetails);
        void UpdateCustomerDetails(CustomerDetail customerDetails);
        CustomerDetail GetCustomerDetailsById(int id);
    }
}
