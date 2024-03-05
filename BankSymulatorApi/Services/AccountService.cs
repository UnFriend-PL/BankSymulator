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


        public async Task<ServiceResponse<bool>> CreateAccountAsync(User user, NewAccountDto model)
        {
            var serviceResponse = new ServiceResponse<bool>();
            try
            {
                Account account = new Account
                {
                    Name = model.Name,
                    OwnerId = user.Id,
                    AccountNumber = Guid.NewGuid().ToString(),
                    Currency = model.Currency,

                };
                await _context.Accounts.AddAsync(account);
                await _context.SaveChangesAsync();
                serviceResponse.Success = true;
                return serviceResponse;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                return serviceResponse;
            }
        }

        public async Task<ServiceResponse<List<AccountDto>>> GetAccountsByUserIdAsync(string userId)
        {
            var serviceResponse = new ServiceResponse<List<AccountDto>>();
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
                serviceResponse.Data = accounts;
            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> DepositAsync(DepositDto model, string AccountNumber)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                var serviceResponse = new ServiceResponse<bool>();
                try
                {
                    var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == model.AccountNumber);

                    if (account == null)
                    {
                        serviceResponse.Success = false;
                        return serviceResponse;
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

                    return serviceResponse;
                }
                catch (Exception e)
                {
                    await transaction.RollbackAsync();
                    serviceResponse.Success = false;
                    return serviceResponse;
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

        public async Task<ServiceResponse<bool>> WithdrawAsync(WithdrawDto model, string userId)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                var serviceResponse = new ServiceResponse<bool>();
                try
                {
                    var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == model.AccountNumber);
                    var isUserIdOwnerOfSelectedAccount = await CheckAccountOwner(userId, model.AccountNumber);

                    if (!isUserIdOwnerOfSelectedAccount || account.Balance < model.Amount)
                    {
                        transaction.Rollback();
                        serviceResponse.Success = false;
                        return serviceResponse;
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

                    return serviceResponse;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    serviceResponse.Success = false;
                    return serviceResponse;
                }
            }
        }

        public async Task<ServiceResponse<bool>> TransferAsync(TransferDto model, string userId)
        {
            var serviceResponse = new ServiceResponse<bool>();
            var fromAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == model.FromAccountNumber);
            if (fromAccount == null)
            {
                serviceResponse.Success = false;
                return serviceResponse;
            }
            if (fromAccount.OwnerId != userId)
            {
                serviceResponse.Success = false;
                return serviceResponse;
            }
            if (fromAccount.Balance < model.TransferAmount)
            {
                serviceResponse.Success = false;
                return serviceResponse;
            }
            var toAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == model.ToAccountNumber);
            if (toAccount == null)
            {
                serviceResponse.Success = false;
                return serviceResponse;
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
                    return serviceResponse;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    serviceResponse.Success = false;
                    return serviceResponse;
                }
            }
        }
    }
}
