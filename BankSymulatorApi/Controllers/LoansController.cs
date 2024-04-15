using BankSymulatorApi.Models;
using BankSymulatorApi.Models.Loans;
using BankSymulatorApi.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BankSymulatorApi.Controllers
{
    [Route("api/[controller]")]
    public class LoansController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserService _userService;
        public LoansController( IUserService userService, UserManager<User> userManager)
        {
            _userManager = userManager;
            _userService = userService;
        }

        //[HttpPost("apply")]
        //public async Task<ActionResult<Loan>> ApplyForLoan(LoanApplication application)
        //{
        //}

    }
}
