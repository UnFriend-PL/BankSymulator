using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO.LoanDtos;
using BankSymulatorApi.Models.Loans;
using BankSymulatorApi.Services;
using BankSymulatorApi.Services.LoanService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BankSymulatorApi.Controllers
{
    [Route("api/[controller]")]
    public class LoansController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserService _userService;
        private readonly ILoanService _loanService;
        public LoansController(ILoanService loanService ,IUserService userService, UserManager<User> userManager)
        {
            _userManager = userManager;
            _userService = userService;
            _loanService = loanService;
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("apply")]
        public async Task<ActionResult<Loan>> ApplyForLoan([FromBody] LoanDto loanRequest)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return BadRequest(new { Message = "User not found." });
            }
            var response = await _loanService.ApplyForLoan(loanRequest, userId);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

    }
}
