using BankSymulatorApi.Database;
using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BankSymulatorApi.Services
{

    public class AdminService : IAdminService
    {
        private readonly BankDbContext _context;
        private readonly IUserService _userService;
        private readonly UserManager<User> _userManager;
        private readonly IAccountService _accountService;
        private readonly IApplicationService _applicationService;
        public AdminService(BankDbContext context, IUserService userService, UserManager<User> userManager, IAccountService accountService, IApplicationService applicationService)
        {
            _applicationService = applicationService;
            _accountService = accountService;
            _context = context;
            _userService = userService;
            _userManager = userManager;
        }

        public Task<ServiceResponse<bool>> EditUserDataAsync(EditUserDto model, string userId)
        {
            var result = _userService.EditUserDataAsync(model, userId);
            return result;
        }

        public async Task<ServiceResponse<List<AccountDto>>> GetUserAccounts(string userId)
        {
            var result = _accountService.GetAccountsByUserIdAsync(userId);
            return await result;
        }

        public Task<ServiceResponse<List<JointApplicationsDto>>> GetUserApplications(string userId, string status)
        {
           var result = _applicationService.GetJointAccountApplicationsByUserIdAsync(userId, status);
            return result;
        }

        public async Task<ServiceResponse<UserDto>> GetUserInfo(string user)
        {
            var serviceResponse = new ServiceResponse<UserDto>();
            var client = await _context.Users.Where(u => u.Email == user || u.PhoneNumber == user || u.Id == user ).FirstOrDefaultAsync();
            if(client == null)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "User not found";
                return serviceResponse;
            }
            var userDto = new UserDto(client);
            
            serviceResponse.Data = userDto;
            serviceResponse.Success = true;

            return serviceResponse;
        }
    }
}
