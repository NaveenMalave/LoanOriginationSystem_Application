using LoanAppExceptionLib;
using LoanOrigination.CustomerDetails.Models;
using LoanOrigination.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace LoanOrigination.Controllers
{
    [ApiController]
    [Route("api/loan")]
    [Authorize]
    public class LoanApplicationController : ControllerBase
    {
        private readonly ILoanApplicationDataAccess _dataAccess;
       

        public LoanApplicationController(ILoanApplicationDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
          
        }

        [HttpPost]
        [Route("calculate-and-add/{customerId}")]
        public IActionResult CalculateAndAddLoan(int customerId, [FromBody] LoanApplication loanRequest)
        {
            if (customerId <= 0 )
            {
                return BadRequest(new { error = "Invalid Customer ID or Loan Request data." });
            }

            var netIncome = _dataAccess.GetNetIncomeByCustomerId(customerId);
            if (netIncome == null)
            {
                return NotFound(new { error = "Customer not found or does not have Employment Details." });
            }

            int suggestedLoanAmount = (int)Math.Round((decimal)netIncome / 3, MidpointRounding.AwayFromZero);
            int maximumLoanAmount = (int)Math.Round((decimal)netIncome / 2, MidpointRounding.AwayFromZero);

            if (loanRequest.LoanAmount< suggestedLoanAmount || loanRequest.LoanAmount > maximumLoanAmount)
            {
                return BadRequest(new
                {
                    error = "Loan amount should be greater than the suggested amount and less than the maximum amount.",
                    suggestedLoanAmount,
                    maximumLoanAmount
                });
            }

            
            try
            {
                _dataAccess.AddLoanApplication(loanRequest);

                return Ok(new
                {
                    message = "Loan application added successfully.",
                    loanRequest.LoanId,
                    suggestedLoanAmount,
                    maximumLoanAmount
                });
            }
            catch (DbUpdateException ex)
            {
               
                return StatusCode(500, new { error = "Failed to save loan application. Please check database constraints or relationships." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An internal server error occurred. Please try again later." });
            }
        }

        [HttpGet("GetNetIncome")]
        public IActionResult GetNetIncomeByCustomerId([FromQuery] int customerId)
        {
            if (customerId <= 0)
            {
                return BadRequest(new { error = "Invalid Customer ID or Loan Request data." });
            }
            var netIncome = _dataAccess.GetNetIncomeByCustomerId(customerId);
            return Ok(netIncome);

        }

 
        [HttpGet("GetDetails")]

        public IActionResult GetDetailsById([FromQuery] int customerId)
        {
            if (customerId <= 0)
            {
                return BadRequest(new { err = "Invalid Customer ID or Loan Request data." });
            }
            var details = _dataAccess.GetCustomerDetailsById(customerId);

            if(details == null)
            {
                return NotFound(new {err = "Details Not found"});
            }

            return Ok(details);
        }

        [HttpGet("GetAll")]

        public IActionResult GetAllApplication()
        {
            try
            {
                return Ok(_dataAccess.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(new {ex.Message});
            }
        }



        [HttpPut("UpdateStatus/{id}/{status}")]
        public IActionResult UpdateStatus(int id, string status)
        {
            try
            {
               _dataAccess.UpdateStatus(id, status);
                return Ok(new {msg= "Loan application status updated successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
