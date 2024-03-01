using BankSymulatorApi.Models;
using BankSymulatorApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BankSymulatorApi.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly UserManager<User> _userManager;
        private readonly IUserService _userService;
        public AccountController(IAccountService accountService, IUserService userService, UserManager<User> userManager)
        {
            _userManager = userManager;
            _accountService = accountService;
            _userService = userService;
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("GetAccountsByUserIdAsync")]
        public async Task<IActionResult> GetAccountsByUserIdAsync()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var accounts = await _accountService.GetAccountsByUserIdAsync(userId);
            return Ok(accounts);
        }
    }
}
