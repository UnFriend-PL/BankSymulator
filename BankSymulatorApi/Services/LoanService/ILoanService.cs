using BankSymulatorApi.Models.DTO.Applications.LoanDtos;

namespace BankSymulatorApi.Services.LoanService
{
    public interface ILoanService
    {
        public Task<ServiceResponse<string>> ApplyForLoan(LoanRequestDto loanRequest, string userId);
    }
}
