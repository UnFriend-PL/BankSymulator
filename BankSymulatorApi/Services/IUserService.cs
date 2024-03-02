using BankSymulatorApi.Models.DTO;
using Microsoft.AspNetCore.Identity;

namespace BankSymulatorApi.Services
{
    public interface IUserService
    {
        Task<IdentityResult> CreateUserAsync(RegisterDto model);
        Task<LoginResultDto> LoginAsync(LoginDto model);

    }
}
