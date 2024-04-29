using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
using BankSymulatorApi.Models.DTO.Applications;
using Microsoft.AspNetCore.Mvc;

namespace BankSymulatorApi.Services
{
    public interface IAdminService
    {
        public Task<ServiceResponse<UserDto>> GetUserInfo(string user);
        public Task<ServiceResponse<List<AccountDto>>> GetUserAccounts(string userId);
        public Task<ServiceResponse<ApplicationsResponseDto>> GetUserApplications(string userId, string status);
        public Task<ServiceResponse<bool>> EditUserDataAsync(EditUserDto model, string userId);
        public Task<ServiceResponse<bool>> CreateAdditionalAccountAsync( NewAccountDto model, string userId);
        public Task<ServiceResponse<bool>> CreateJointAccountApplicationAsync(string userId, JointAccountApplicationRquestDto model);

    }
}
