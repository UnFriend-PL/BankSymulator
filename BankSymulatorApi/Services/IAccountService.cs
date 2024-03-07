using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace BankSymulatorApi.Services
{
    public interface IAccountService
    {
        public Task<ServiceResponse<bool>> CreateAccountAsync(User user, NewAccountDto model);
        public Task<ServiceResponse<List<AccountDto>>> GetAccountsByUserIdAsync(string userId);
        public Task<ServiceResponse<bool>> DepositAsync(DepositDto model, string accountNumber);
        public Task<ServiceResponse<bool>> WithdrawAsync(WithdrawDto model, string userId);
        public Task<ServiceResponse<bool>> TransferAsync(TransferDto model, string userId);
        public Task<ServiceResponse<List<TransactionDto>>> GetAccountHistoryAsync(string accountNumber, string userId);
    }
}
