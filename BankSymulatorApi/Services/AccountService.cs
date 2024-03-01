using BankSymulatorApi.Database;
using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankSymulatorApi.Services
{
    public class AccountService : IAccountService
    {
        private readonly BankDbContext _context;

        public AccountService(BankDbContext context)
        {
            _context = context;
        }


        public async Task<bool> CreateAccountAsync(User user, string? currency)
        {
            try
            {
                Account account = new Account
                {
                    Name = "Main Account",
                    OwnerId = user.Id,
                    AccountNumber = Guid.NewGuid().ToString(),
                    Currency = currency
                   
                };
                await _context.Accounts.AddAsync(account);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<List<AccountDto>> GetAccountsByUserIdAsync(string userId)
        {
            var accounts = await _context.Accounts
                .Where(a => a.OwnerId == userId)
                .Select(a => new AccountDto
                {
                    AccountId = a.AccountId,
                    OwnerId = a.OwnerId,
                    AccountNumber = a.AccountNumber,
                    Name = a.Name,
                    Balance = a.Balance,
                    IsActive = a.IsActive,
                    IsSaveAccount = a.IsSaveAccount,
                    currency = a.Currency
                })
                .ToListAsync();

            return accounts;
        }

        public async Task<bool> DepositAsync(DepositDto model, string AccountNumber)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == model.AccountNumber);
            if (account == null)
            {
                return false;
            }
            var deposit = new Deposit
            {
                AccountNumber = model.AccountNumber,
                Amount = model.Amount,
                DepositTime = DateTime.Now
            };
            await _context.Deposits.AddAsync(deposit);
            account.Balance += model.Amount;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
