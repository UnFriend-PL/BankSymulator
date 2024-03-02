using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
using BankSymulatorApi.Services;
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

        if (result.Succeeded)
        {
            return Ok(new { Message = "User registered successfully!" });
        }

        return BadRequest(new { Message = "Registration failed.", Errors = result.Errors });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        var result = await _userService.LoginAsync(model);

        if (result.Success)
        {
            return Ok(new { Token = result.Token });
        }

        return Unauthorized(new { Message = "Invalid login attempt.", Errors = result.Errors });
    }
}
