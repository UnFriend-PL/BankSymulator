using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;

namespace BankSymulatorApi.Services
{
    public interface IAccountService
    {
        public Task<bool> CreateAccountAsync(User user, string currency);
        Task<List<AccountDto>> GetAccountsByUserIdAsync(string userId);
        Task<bool> DepositAsync(DepositDto model, string accountNumber);
    }
}
