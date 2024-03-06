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
            return BadRequest(new { Message = "User not found." });
        }
        var result = await _userService.EditUserDataAsync(model, userId);

        if (result.Success)
        {
            return Ok(result);
        }

        result.Message = "Edit profile failed.";

        return BadRequest(result);
    }
}
