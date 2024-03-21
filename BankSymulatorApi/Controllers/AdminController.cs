using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
using BankSymulatorApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BankSymulatorApi.Controllers
{
    [Route("api/[controller]")]
    public class AdminController : Controller
    {

        private readonly IAdminService _adminService;
        private readonly UserManager<User> _userManager;
        private readonly IUserService _userService;
        public AdminController(IAdminService adminService, IUserService userService, UserManager<User> userManager)
        {
            _userManager = userManager;
            _adminService = adminService;
            _userService = userService;
        }

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        [HttpGet("User/{user}")]
        public async Task<IActionResult> GetUserInfo(string user)
        {
            var result = await _adminService.GetUserInfo(user);
            if (result.Success)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        [HttpGet("Accounts/{userId}")]
        public async Task<IActionResult> GetUserAccounts(string userId)
        {
            var result = await _adminService.GetUserAccounts(userId);
            if (result.Success)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        [HttpGet("Applications/JointApplications/{userId}/{status}")]
        public async Task<IActionResult> GetUserApplications(string userId, string status)
        {
            if (userId == null)
            {
                return BadRequest(new { Message = "User not found." });
            }
            var result = await _adminService.GetUserApplications(userId, status);
            if (result.Success)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        [HttpPatch("User/Edit/{userId}")]
        public async Task<IActionResult> EditUserData(string userId, [FromBody] EditUserDto model)
        {
            var result = await _adminService.EditUserDataAsync(model, userId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
