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
    public class AccountsController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly UserManager<User> _userManager;
        private readonly IUserService _userService;
        public AccountsController(IAccountService accountService, IUserService userService, UserManager<User> userManager)
        {
            _userManager = userManager;
            _accountService = accountService;
            _userService = userService;
        }

        [HttpGet("GetAccountOwnerName/{accountNumber}")]
        public async Task<IActionResult> GetAccountOwnerName(string accountNumber)
        {
            var ownerName = await _accountService.GetAccountOwnerName(accountNumber);
            return Ok(ownerName);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("GetByUserToken")]
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
        [HttpPost("Create")]
        public async Task<IActionResult> CreateAdditionalAccountAsync([FromBody] NewAccountDto model)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest(new { Message = "User not found." });
            }
            var result = await _accountService.CreateAccountAsync(user, model);
            if (result.Success)
            {
                result.Message = "Account created successfully!";
                return Ok(result);
            }
            result.Message = "Account creation failed.";
            return BadRequest(result);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPut("Deposit")]
        public async Task<IActionResult> DepositAsync([FromBody] DepositDto model)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _accountService.DepositAsync(model, userId);
            if (result.Success)
            {
                result.Message = "Deposit successful!";
                return Ok(result);
            }
            result.Message = "Deposit failed.";
            return BadRequest(result);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPut("Withdraw")]
        public async Task<IActionResult> WithdrawAsync([FromBody] WithdrawDto model)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(userId == null)
            {
                var response = new ServiceResponse<bool>();
                response.Message = "User not found. Cant identify. Try relogin";
                response.Success = false;
                return BadRequest(response);
            }
            var result = await _accountService.WithdrawAsync(model, userId);
            if (result.Success)
            {
                result.Message = "Withdraw successful!";
                return Ok(result);
            }
            result.Message = "Withdraw failed.";
            return BadRequest(result);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPut("Transfer")]
        public async Task<IActionResult> TransferAsync([FromBody] TransferDto model)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                var response = new ServiceResponse<bool>();
                response.Message = "User not found. Cant identify. Try relogin";
                return BadRequest(response);
            }
            var result = await _accountService.TransferAsync(model, userId);
            if (result.Success)
            {
                result.Message = "Transfer successful!";
                return Ok(result);
            }
            result.Message = "Transfer failed.";
            return BadRequest(result);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("History/{accountNumber}/{pageNumber}/{pageSize}")]
        public async Task<IActionResult> GetAccountHistoryAsync(string accountNumber, int pageNumber, int pageSize)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return BadRequest(new { Message = "User not found." });
            }
            var history = await _accountService.GetAccountHistoryAsync(accountNumber, userId, pageNumber, pageSize);
            return Ok(history);
        }
    }
}
