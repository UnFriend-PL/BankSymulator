using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
using BankSymulatorApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly IUserService _userService;
    public UserController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, IUserService userService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _userService = userService;

    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        var result = await _userService.CreateUserAsync(model);

        if (result.Success)
        {
            return Ok(result);
        }

        result.Message = "Registration failed.";
        return BadRequest(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        var result = await _userService.LoginAsync(model);

        if (result.Success)
        {
            return Ok(result);
        }

        result.Message = "Invalid login attempt.";

        return Unauthorized(result);
    }

    [Authorize(AuthenticationSchemes = "Bearer")]
    [HttpPatch("editUserData")]
    public async Task<IActionResult> editUserData([FromBody] EditUserDto model)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            var response = new BankSymulatorApi.ServiceResponse<bool>();
            response.Success = false;
            return BadRequest(response);
        }
        var result = await _userService.EditUserDataAsync(model, userId);

        if (result.Success)
        {
            return Ok(result);
        }

        result.Message = "Edit profile failed.";

        return BadRequest(result);
    }

    [Authorize(AuthenticationSchemes = "Bearer")]
    [HttpPatch("changePassword")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto model)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
           var response = new BankSymulatorApi.ServiceResponse<bool>();
            response.Success = false;
            response.Message = "User not found. Cant identify. Try relogin";
            return BadRequest(response);
        }
        var result = await _userService.ChangePasswordAsync(model, userId);

        if (result.Success)
        {
            result.Message = "Password changed successfully!";
            return Ok(result);
        }
        result.Message = "Password change failed.";
        return BadRequest(result);
    }
}
