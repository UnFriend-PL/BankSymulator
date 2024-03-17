using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
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

        public async Task<ServiceResponse<IdentityResult>> CreateUserAsync(RegisterDto model)
        {
            var serviceResponse = new ServiceResponse<IdentityResult>();
            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                Surname = model.Surname,
                BirthDate = model.BirthDate,
                Address = model.Address,
                PhoneNumber = model.PhoneNumber,
                Name = model.Name,
                Pesel = model.Pesel,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            serviceResponse.Success = result.Succeeded;
            serviceResponse.Errors = result.Errors.Select(e => e.Description).ToArray();

            if (result.Succeeded)
            {
                await _accountService.CreateAccountAsync(user, new NewAccountDto { Name = "Default Account", Currency = "PLN" });

                await  _userManager.AddToRoleAsync(user, "User");

            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<LoginResultDto>> LoginAsync(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            var serviceResponse = new ServiceResponse<LoginResultDto>();

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var claims = new[]
                {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)

            };
                var roles = await _userManager.GetRolesAsync(user);
                foreach (var role in roles)
                {
                    claims.Append(new Claim(ClaimTypes.Role, role));
                }

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpirationInMinutes"])),
                    signingCredentials: creds
                );
                var jwt = new JwtSecurityTokenHandler().WriteToken(token);
                serviceResponse.Data = new LoginResultDto(jwt, user);
                return serviceResponse;
            }
            serviceResponse.Success = false;
            serviceResponse.Errors = new[] { "Invalid login attempt." };
            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> EditUserDataAsync(EditUserDto model, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var serviceResponse = new ServiceResponse<bool>();
            user.Name = model.Name;
            user.Surname = model.Surname;
            user.BirthDate = model.BirthDate;
            user.Address = model.Address;
            user.Pesel = model.Pesel;
            user.PhoneNumber = model.PhoneNumber;
            user.Email = model.Email;
            var result = await _userManager.UpdateAsync(user);
            serviceResponse.Success = result.Succeeded;
            serviceResponse.Data = result.Succeeded;
            serviceResponse.Errors = result.Errors.Select(e => e.Description).ToArray();
            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> ChangePasswordAsync(ChangePasswordDto model, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var serviceResponse = new ServiceResponse<bool>();
            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            serviceResponse.Success = result.Succeeded;
            serviceResponse.Data = result.Succeeded;
            serviceResponse.Errors = result.Errors.Select(e => e.Description).ToArray();
            return serviceResponse;
        }
    }
}
