using BankSymulatorApi.Models;
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
        [HttpGet("GetUserInfo/{user}")]
        public async Task<IActionResult> GetUserInfo(string user)
        {
            var result = await _adminService.GetUserInfo(user);
            if (result.Success)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

    }
}
