using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
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
            if (userId == null)
            {
                return BadRequest(new { Message = "User not found." });
            }
            var accounts = await _accountService.GetAccountsByUserIdAsync(userId);
            return Ok(accounts);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("CreateAdditionalAccountAsync")]
        public async Task<IActionResult> CreateAdditionalAccountAsync(string? currency)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest(new { Message = "User not found." });
            }
            var result = await _accountService.CreateAccountAsync(user, currency !=null? currency : "PLN");
            if (result)
            {
                return Ok(new { Message = "Account created successfully!" });
            }
            return BadRequest(new { Message = "Account creation failed." });
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("DepositAsync")]
        public async Task<IActionResult> DepositAsync([FromBody] DepositDto model)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _accountService.DepositAsync(model, userId);
            if (result)
            {
                return Ok(new { Message = "Deposit successful!" });
            }
            return BadRequest(new { Message = "Deposit failed." });
        }

    }
}
