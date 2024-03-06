using BankSymulatorApi.Models.DTO;
using Microsoft.AspNetCore.Identity;

namespace BankSymulatorApi.Services
{
    public interface IUserService
    {
        Task<ServiceResponse<IdentityResult>> CreateUserAsync(RegisterDto model);
        Task<ServiceResponse<LoginResultDto>> LoginAsync(LoginDto model);
        Task<ServiceResponse<bool>> EditUserDataAsync(EditUserDto model, string userId);

    }
}
