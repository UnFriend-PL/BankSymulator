using BankSymulatorApi.Models;

namespace BankSymulatorApi.Services
{
    public interface IAccountService
    {
        public Task<bool> CreateAccountAsync(User user);
    }
}
