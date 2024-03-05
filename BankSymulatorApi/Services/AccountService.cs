using BankSymulatorApi.Database;
using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
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


        public async Task<bool> CreateAccountAsync(User user, string currency)
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
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {

                try
                {
                    var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == model.AccountNumber);

                    if (account == null)
                    {
                        return false;
                    }

                    var contributor = await _context.Contributors.FirstOrDefaultAsync(c => c.Pesel == model.Contributor.Pesel);

                    if (contributor == null)
                    {
                        contributor = await AddNewContributorAsync(model.Contributor);
                    }
                    account.Balance += model.Amount;

                    var deposit = new Deposit
                    {
                        AccountNumber = model.AccountNumber,
                        Amount = model.Amount,
                        DepositTime = DateTime.Now,
                        ContributorId = contributor.ContributorId,
                        BalanceAfterOperation = account.Balance
                    };

                    await _context.Deposits.AddAsync(deposit);

                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();

                    return true;
                }
                catch (Exception e)
                {
                    await transaction.RollbackAsync();
                    Console.WriteLine(e.Message);
                    return false;
                }
            }
        }

        private async Task<bool> CheckAccountOwner(string userId, string accountNumber)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == accountNumber);
            if (account == null)
            {
                return false;
            }
            return account.OwnerId == userId;
        }

        private async Task<Contributor> AddNewContributorAsync(ContributorDto contributorDto)
        {
            var contributor = new Contributor
            {
                Pesel = contributorDto.Pesel,
                Name = contributorDto.Name,
                Surname = contributorDto.Surname,
                Email = contributorDto.Email,
                PhoneNumber = contributorDto.PhoneNumber,
                Address = contributorDto.Address
            };

            await _context.Contributors.AddAsync(contributor);
            await _context.SaveChangesAsync();

            contributor = await _context.Contributors.FirstOrDefaultAsync(u => u.Pesel == contributorDto.Pesel);

            return contributor;
        }

        public async Task<bool> WithdrawAsync(WithdrawDto model, string userId)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == model.AccountNumber);
                    var isUserIdOwnerOfSelectedAccount = await CheckAccountOwner(userId, model.AccountNumber);

                    if (!isUserIdOwnerOfSelectedAccount || account.Balance < model.Amount)
                    {
                        transaction.Rollback();
                        return false;
                    }

                    account.Balance -= model.Amount;

                    var withdraw = new Withdraw
                    {
                        AccountNumber = model.AccountNumber,
                        Amount = model.Amount,
                        WithdrawTime = DateTime.Now,
                        BalanceAfterOperation = account.Balance
                    };
                    await _context.Withdraws.AddAsync(withdraw);
                    await _context.SaveChangesAsync();

                    transaction.Commit();

                    return true;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return false;
                }
            }
        }

        public async Task<bool> TransferAsync(TransferDto model, string userId)
        {
            var fromAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == model.FromAccountNumber);
            if (fromAccount == null)
            {
                return false;
            }
            if (fromAccount.OwnerId != userId)
            {
                return false;
            }
            if (fromAccount.Balance < model.TransferAmount)
            {
                return false;
            }
            var toAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == model.ToAccountNumber);
            if (toAccount == null)
            {
                return false;
            }
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    fromAccount.Balance -= model.TransferAmount;
                    toAccount.Balance += model.TransferAmount;
                    var transfer = new Transfer
                    {
                        TransferType = model.TransferType,
                        TransferAmount = model.TransferAmount,
                        TransferTime = DateTime.Now,
                        FromAccountNumber = fromAccount.AccountNumber,
                        ToAccountNumber = toAccount.AccountNumber,
                        Message = model.Message,
                        IsCompleted = true,
                        BalanceAfterOperation = fromAccount.Balance
                    };
                    fromAccount.Balance -= transfer.TransferFee;
                    await _context.Transfers.AddAsync(transfer);
                    await _context.SaveChangesAsync();

                    transaction.Commit();

                    return true;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return false;
                }
            }
        }
    }
}
