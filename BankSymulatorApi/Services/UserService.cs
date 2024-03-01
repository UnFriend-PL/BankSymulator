using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BankSymulatorApi.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IAccountService _accountService;

        public UserService(UserManager<User> userManager, IConfiguration configuration, IAccountService accountService)
        {
            _userManager = userManager;
            _configuration = configuration;
            _accountService = accountService;
        }

        public async Task<IdentityResult> CreateUserAsync(RegisterDto model)
        {
            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                Surname = model.Surname,
                BirthDate = model.BirthDate,
                Address = model.Address,
                PhoneNumber = model.PhoneNumber,
                Name = model.Name
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await _accountService.CreateAccountAsync(user);
            }
            return result;
        }

        public async Task<LoginResultDto> LoginAsync(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);



            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var claims = new[]
                {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpirationInMinutes"])),
                    signingCredentials: creds
                );

                return new LoginResultDto { Success = true, Token = new JwtSecurityTokenHandler().WriteToken(token) };
            }

            return new LoginResultDto { Success = false, Errors = new[] { "Invalid login attempt." } };
        }
    }
}
