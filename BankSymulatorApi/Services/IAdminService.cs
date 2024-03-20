using BankSymulatorApi.Models.DTO;

namespace BankSymulatorApi.Services
{
    public interface IAdminService
    {
        Task<ServiceResponse<UserDto>> GetUserInfo(string user);
    }
}
