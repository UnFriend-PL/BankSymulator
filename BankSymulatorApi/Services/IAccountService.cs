using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;

namespace BankSymulatorApi.Services
{
    public interface IAccountService
    {
        public Task<bool> CreateAccountAsync(User user);
        Task<List<AccountDto>> GetAccountsByUserIdAsync(string userId);
    }
}
