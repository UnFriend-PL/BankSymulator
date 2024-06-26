﻿using BankSymulatorApi.Database;
using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace BankSymulatorApi.Services
{
    public class AccountService : IAccountService
    {
        private readonly BankDbContext _context;
        private readonly HttpClient _httpClient;
        public AccountService(BankDbContext context, HttpClient httpClient)
        {
            _context = context;
            _httpClient = httpClient;
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
                serviceResponse.Errors = new[] { ex.Message };
                return serviceResponse;
            }
        }

        public async Task<ServiceResponse<List<AccountDto>>> GetAccountsByUserIdAsync(string userId)
        {
            var serviceResponse = new ServiceResponse<List<AccountDto>>();
            var accounts = await _context.Accounts
                .Where(a => a.OwnerId == userId || a.JointOwnerId == userId && a.isArchived == false && a.isClosed == false)
                .Include(a => a.Owner)
                .Include(a => a.JointOwner)
                .Select(a => new AccountDto
                {

                    OwnerId = a.OwnerId,
                    AccountNumber = a.AccountNumber,
                    Name = a.Name,
                    Balance = a.Balance,
                    BalanceInPln = a.Balance,
                    IsActive = a.IsActive,
                    IsSaveAccount = a.IsSaveAccount,
                    currency = a.Currency,
                    isJointAccount = a.isJointAccount,
                    JointOwnerId = a.JointOwnerId,
                    OwnerName = a.Owner.Name,
                    OwnerSurname = a.Owner.Surname,
                   
                })
                .ToListAsync();
            foreach (var account in accounts)
            {
                if (account.currency != "PLN")
                {
                    var exchangeRate = await GetExchangeRate(account.currency);
                    account.BalanceInPln = account.Balance * exchangeRate;
                }
                if(account.isJointAccount && account.JointOwnerId != null)
                {
                    var jointOwner = await _context.Users.FirstOrDefaultAsync(u => u.Id == account.JointOwnerId);
                    if (jointOwner.Id == userId)
                    {
                        var owner = await _context.Users.FirstOrDefaultAsync(u => u.Id == account.OwnerId);
                        account.JointOwnerName = owner.Name;
                        account.JointOwnerSurname = owner.Surname;
                        account.OwnerName = jointOwner.Name;
                        account.OwnerSurname = jointOwner.Surname;
                    }
                    else
                    {
                        account.JointOwnerName = jointOwner.Name;
                        account.JointOwnerSurname = jointOwner.Surname;
                        account.OwnerName = account.OwnerName;
                        account.OwnerSurname = account.OwnerSurname;
                    }
                }
            }
            serviceResponse.Data = accounts;
            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> DepositAsync(DepositDto model, string AccountNumber)
        {
            var serviceResponse = new ServiceResponse<bool>();

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var account = await _context.Accounts
                        .Include(a => a.Contributors)
                        .FirstOrDefaultAsync(a => a.AccountNumber == model.AccountNumber);

                    if (account == null)
                    {
                        serviceResponse.Success = false;
                        return serviceResponse;
                    }

                    var contributor = account.Contributors.FirstOrDefault(c => c.Pesel == model.Contributor.Pesel);

                    if (contributor == null)
                    {
                        contributor = await AddNewContributorAsync(model.Contributor, account);
                    }

                    account.Balance += model.Amount;

                    var deposit = new Deposit
                    {
                        AccountNumber = model.AccountNumber,
                        Amount = model.Amount,
                        DepositTime = DateTime.Now,
                        ContributorId = contributor.ContributorId,
                        BalanceAfterOperation = account.Balance,
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
                    serviceResponse.Errors = new[] { e.Message };
                    return serviceResponse;
                }
            }
        }

        private async Task<bool> CheckWithdrawer(string userId, string accountNumber)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == accountNumber);
            if (account == null)
            {
                return false;
            }
            var isOwner = account.OwnerId == userId;
            var isJointOwner = account.JointOwnerId == userId;
            var adminRoleId = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Admin");
            var isAdmin = await _context.UserRoles.AnyAsync(ur => ur.UserId == userId && ur.RoleId == adminRoleId.Id);
            var isPermitedToWithdraw = isOwner || isJointOwner || isAdmin;

            return isPermitedToWithdraw;
        }

        private async Task<Contributor> AddNewContributorAsync(ContributorDto contributorDto, Account  account)
        {
            var contributor = new Contributor
            {
                Pesel = contributorDto.Pesel,
                Name = contributorDto.Name,
                Surname = contributorDto.Surname,
                Email = contributorDto.Email,
                PhoneNumber = contributorDto.PhoneNumber,
                Address = contributorDto.Address,
                AccountNumber = account.AccountNumber
            };

            await _context.Contributors.AddAsync(contributor);
            await _context.SaveChangesAsync();

            contributor = await _context.Contributors.FirstOrDefaultAsync(u => u.Pesel == contributorDto.Pesel);

            return contributor;
        }

        public async Task<ServiceResponse<bool>> WithdrawAsync(WithdrawDto model, string userId)
        {
            var serviceResponse = new ServiceResponse<bool>();

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == model.AccountNumber);
                    if (account == null)
                    {
                        serviceResponse.Success = false;
                        serviceResponse.Errors = new[] { "Account not found" };
                        return serviceResponse;
                    }

                    var isUserPermitedToWithdraw = await CheckWithdrawer(userId, model.AccountNumber);
                    if (!isUserPermitedToWithdraw)
                    {
                        transaction.Rollback();
                        serviceResponse.Success = false;
                        serviceResponse.Errors = new[] { "You are not permited to withdraw from selected account" };
                        return serviceResponse;
                    }

                    if (account.Balance < model.Amount)
                    {
                        transaction.Rollback();
                        serviceResponse.Success = false;
                        serviceResponse.Errors = new[] { "Insufficient funds" };
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
                    await transaction.CommitAsync();

                    return serviceResponse;
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    serviceResponse.Success = false;
                    serviceResponse.Errors = new[] { ex.Message };
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
                serviceResponse.Errors = new[] { "Account not found" };
                return serviceResponse;
            }

            if (fromAccount.OwnerId != userId)
            {
                serviceResponse.Success = false;
                serviceResponse.Errors = new[] { "You are not the owner of the account" };
                return serviceResponse;
            }

            if (fromAccount.Balance < model.TransferAmount)
            {
                serviceResponse.Success = false;
                serviceResponse.Errors = new[] { "Insufficient funds" };
                return serviceResponse;
            }

            var toAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == model.ToAccountNumber);
            if (toAccount == null)
            {
                serviceResponse.Success = false;
                serviceResponse.Errors = new[] { "Destination account not found" };
                return serviceResponse;
            }

            bool useExchangeRate = fromAccount.Currency != toAccount.Currency;

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    fromAccount.Balance -= model.TransferAmount;
                    var amount = await CalculateAmount(toAccount, fromAccount, model.TransferAmount, useExchangeRate);
                    toAccount.Balance += amount;

                    var transfer = new Transfer
                    {
                        TransferType = model.TransferType,
                        SourceCurrencyTransferAmount = model.TransferAmount,
                        TransferAmount = amount,
                        TransferTime = DateTime.Now,
                        FromAccountNumber = fromAccount.AccountNumber,
                        ToAccountNumber = toAccount.AccountNumber,
                        Message = model.Message,
                        IsCompleted = true,
                        BalanceAfterOperationFromAccount = fromAccount.Balance,
                        BalanceAfterOperationToAccount = toAccount.Balance
                    };

                    await _context.Transfers.AddAsync(transfer);
                    await _context.SaveChangesAsync();

                    await transaction.CommitAsync();
                    return serviceResponse;
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    serviceResponse.Success = false;
                    serviceResponse.Errors = new[] { ex.Message };
                    return serviceResponse;
                }
            }
        }

        private async Task<float> CalculateAmount(Account toAccount, Account fromAccount, float transferAmount, bool useExchangeRate)
        {
            if (useExchangeRate)
            {
                float exchangeRate = 1f;
                if (toAccount.Currency == "PLN")
                {
                    exchangeRate = await GetExchangeRate(fromAccount.Currency);
                    return transferAmount * exchangeRate;
                }
                else
                {
                    exchangeRate = await GetExchangeRate(toAccount.Currency);
                    return transferAmount / exchangeRate;
                }
            }
            else
            {
                return transferAmount;
            }
        }

        private async Task<float> GetExchangeRate(string currency)
        {
            var response = await _httpClient.GetAsync($"http://api.nbp.pl/api/exchangerates/rates/A/{currency}?format=json");
            if (!response.IsSuccessStatusCode)
            {
                return 1f;
            }
            response.EnsureSuccessStatusCode();
            var jsonString = await response.Content.ReadAsStringAsync();
            var result = await response.Content.ReadAsStringAsync();
            var exchangeRateResponse = JsonConvert.DeserializeObject<ExchangeRateResponse>(jsonString);
            return exchangeRateResponse.Rates[0].Mid;
        }

        public async Task<ServiceResponse<TransactionsPageDto>> GetAccountHistoryAsync(string accountNumber, string userId, int pageNumber, int pageSize)
        {
            var serviceResponse = new ServiceResponse<TransactionsPageDto>();

            try
            {
                var transfers = await _context.Transfers
                    .Where(t => t.ToAccountNumber == accountNumber || t.FromAccountNumber == accountNumber)
                    .Select(t => new TransactionDto
                    {
                        TransferId = t.TransferId,
                        TransferType = t.TransferType,
                        TransferAmount = t.TransferAmount,
                        TransferFee = t.TransferFee,
                        TransferTime = t.TransferTime,
                        FromAccountNumber = t.FromAccountNumber,
                        ToAccountNumber = t.ToAccountNumber,
                        Message = t.Message,
                        IsCompleted = t.IsCompleted,
                        BalanceAfterOperation = t.FromAccountNumber == accountNumber ? t.BalanceAfterOperationFromAccount : t.BalanceAfterOperationToAccount,
                        SourceCurrencyTransferAmount = t.SourceCurrencyTransferAmount
                    })
                    .ToListAsync();

                var deposits = await _context.Deposits
                    .Where(d => d.AccountNumber == accountNumber)
                    .Select(d => new TransactionDto
                    {
                        TransferId = d.DepositId,
                        TransferAmount = d.Amount,
                        TransferTime = d.DepositTime,
                        BalanceAfterOperation = d.BalanceAfterOperation,
                        Message = "Deposit",
                        IsCompleted = true,
                        TransferType = "Deposit",
                        FromAccountNumber = "ATM",
                        ToAccountNumber = d.AccountNumber,
                        SourceCurrencyTransferAmount = d.Amount

                    })
                    .ToListAsync();

                var withdraws = await _context.Withdraws
                    .Where(w => w.AccountNumber == accountNumber)
                    .Select(w => new TransactionDto
                    {
                        TransferId = w.WithdrawId,
                        TransferAmount = w.Amount,
                        TransferTime = w.WithdrawTime,
                        BalanceAfterOperation = w.BalanceAfterOperation,
                        TransferFee = 0,
                        Message = "Withdraw",
                        IsCompleted = true,
                        TransferType = "Withdraw",
                        FromAccountNumber = w.AccountNumber,
                        ToAccountNumber = "ATM",
                        SourceCurrencyTransferAmount = w.Amount

                    })
                    .ToListAsync();

                var history = transfers.Concat(deposits).Concat(withdraws).ToList();
                var totalTransactions = await GetTotalTransactionsCount(accountNumber);
                var totalPages = (int)Math.Ceiling((double)totalTransactions / pageSize);

                var transactionsPageDto = new TransactionsPageDto
                {
                    Transactions = history.OrderByDescending(t => t.TransferTime).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList(),
                    TotalPages = totalPages
                };

                serviceResponse.Data = transactionsPageDto;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Errors = new[] { ex.Message };
            }

            return serviceResponse;
        }

        private async Task<int> GetTotalTransactionsCount(string accountNumber)
        {
            int totalTransactionsCount = 0;

            try
            {
                totalTransactionsCount = await _context.Transfers
                    .Where(t => t.ToAccountNumber == accountNumber || t.FromAccountNumber == accountNumber)
                    .CountAsync();

                totalTransactionsCount += await _context.Deposits
                    .Where(d => d.AccountNumber == accountNumber)
                    .CountAsync();

                totalTransactionsCount += await _context.Withdraws
                    .Where(w => w.AccountNumber == accountNumber)
                    .CountAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"cannot get count of all transactions: {ex.Message}");
                throw;
            }

            return totalTransactionsCount;
        }
    }
}
