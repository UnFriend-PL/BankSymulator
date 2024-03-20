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
        public AdminService(BankDbContext context, IUserService userService, UserManager<User> userManager)
        {
            _context = context;
            _userService = userService;
            _userManager = userManager;
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
            var userDto = new UserDto
            {
                Name = client.Name,
                Surname = client.Surname,
                Email = client.Email,
                PhoneNumber = client.PhoneNumber,
                Address = client.Address,
                BirthDate = client.BirthDate,
                Pesel = client.Pesel
            };
            serviceResponse.Data = userDto;
            serviceResponse.Success = true;

            return serviceResponse;
        }
    }
}
