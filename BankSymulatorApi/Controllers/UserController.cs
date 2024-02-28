using BankSymulatorApi.Models;
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

    public UserController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var user = new User
        {
            UserName = model.Email,
            Email = model.Email,
            Surname = model.Surname,
            BirthDate = model.BirthDate,
            Address = model.Address
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            return Ok(new { Message = "User registered successfully!" });
        }

        return BadRequest(new { Message = "Registration failed.", Errors = result.Errors });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);

        if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
        {
            var claims = new[]
            {
    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
};

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpirationInMinutes"])),
                signingCredentials: creds
            );

            return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(token) });
        }

        return Unauthorized(new { Message = "Invalid login attempt." });
    }
}

public class RegisterModel
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public int PhoneNumber { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime BirthDate { get; set; }
    public string Address { get; set; }
}

public class LoginModel
{
    public string Email { get; set; }
    public string Password { get; set; }
}
