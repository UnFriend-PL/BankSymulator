using BankSymulatorApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BankSymulatorApi.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly IUserService _userService;
        public AccountController(IAccountService accountService, IUserService userService)
        {
            _accountService = accountService;
            _userService = userService;
        }

       [HttpGet("Accounts/{userId}")]
        public async Task<IActionResult> GetAccountsByUserIdAsync(string userId)
        {
            var accounts = await _accountService.GetAccountsByUserIdAsync(userId);
            return Ok(accounts);
        }
    }
}
