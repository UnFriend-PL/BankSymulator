using BankSymulatorApi.Models.DTO.LoanDtos;

namespace BankSymulatorApi.Services.LoanService
{
    public interface ILoanService
    {
        public Task<ServiceResponse<string>> ApplyForLoan(LoanDto loanRequest, string userId);
    }
}
