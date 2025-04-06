
using LoanAppExceptionLib;
using LoanOrigination.CustomerDetails.Models;
using LoanOrigination.Models.CustomerSearch;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LoanOrigination.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AddCustomerController : ControllerBase
    {
        private readonly ICustomerDetailsDataAccess dal;
        public AddCustomerController(ICustomerDetailsDataAccess dal) 
        {
            this.dal = dal;
        }
        [HttpPost]
        [Route("AddCustomerDetails")]
        public IActionResult AddCustomerDetails([FromBody] CustomerDetail customerDetails)
        {
            try
            {
                dal.AddCustomerDetails(customerDetails);
                return Ok(new { msg = "CustomerDetails added Successfully", customerDetails.Id});


            }
            catch (Exception ex)
            {
                return BadRequest(new { msg = ex.Message });
            }

        }

        [HttpGet]
        [Route("GetDetailsById/{id}")]

        public IActionResult GetCustomerDetailsById(int id)
        {
            try
            {
                var customerDetail = dal.GetCustomerDetailsById(id);
                return Ok(customerDetail);
            }
            catch (CustomerException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPut]
        [Route("UpdateDetails")]

        public IActionResult UpdateCustomerDetails([FromBody] CustomerDetail customerDetails)
        {
            try
            {
                dal.UpdateCustomerDetails(customerDetails);
                return Ok(new { message = "Customer updated successfully.", customerDetails.Id});

            }
            catch (CustomerException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
   
