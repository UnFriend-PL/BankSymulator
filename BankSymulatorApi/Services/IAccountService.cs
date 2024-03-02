using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace BankSymulatorApi.Services
{
    public interface IAccountService
    {
        public Task<bool> CreateAccountAsync(User user, string currency);
        public Task<List<AccountDto>> GetAccountsByUserIdAsync(string userId);
        public Task<bool> DepositAsync(DepositDto model, string accountNumber);
        public Task<bool> WithdrawAsync(WithdrawDto model, string userId);
    }
}
